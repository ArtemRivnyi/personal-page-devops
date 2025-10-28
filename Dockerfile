# Stage 1: Build and Test
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source files
COPY . .

# Stage 2: Production Image
FROM nginx:alpine

# Install security updates
RUN apk upgrade --no-cache

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy static files from builder
COPY --from=builder /build/index.html /usr/share/nginx/html/
COPY --from=builder /build/style.css /usr/share/nginx/html/
COPY --from=builder /build/script.js /usr/share/nginx/html/

# Copy docs folder (if exists)
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