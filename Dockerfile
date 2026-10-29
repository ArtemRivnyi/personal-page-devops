# Stage 1: Validate Static Assets & Quality Gates
FROM node:22-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies for validation gate
RUN npm ci

# Copy source files and verify lint/HTML/CSS invariants
COPY . .
RUN npm run validate

# Stage 2: Hardened Production Image
FROM nginx:1.27-alpine-slim

# Install security updates & remove default nginx files
RUN apk upgrade --no-cache && rm -rf /usr/share/nginx/html/*

# Copy static files from builder
COPY --from=builder /build/index.html /usr/share/nginx/html/
COPY --from=builder /build/style.css /usr/share/nginx/html/
COPY --from=builder /build/script.js /usr/share/nginx/html/
COPY --from=builder /build/robots.txt /usr/share/nginx/html/
COPY --from=builder /build/sitemap.xml /usr/share/nginx/html/
COPY --from=builder /build/llms.txt /usr/share/nginx/html/

# Copy assets and docs folders
COPY --from=builder /build/assets /usr/share/nginx/html/assets/
COPY --from=builder /build/docs /usr/share/nginx/html/docs/

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Run as root (Render requires this for free tier)
CMD ["nginx", "-g", "daemon off;"]
