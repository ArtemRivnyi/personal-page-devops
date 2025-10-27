# Stage 1: Build and Test
FROM node:18-alpine AS builder

WORKDIR /build

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source files
COPY . .

# Run linting and tests (optional, can be removed if done in CI)
# RUN npm run validate && npm test

# Stage 2: Production Image
FROM nginx:alpine

# Install security updates
RUN apk upgrade --no-cache

# Copy built files from builder
COPY --from=builder /build/*.html /usr/share/nginx/html/
COPY --from=builder /build/*.css /usr/share/nginx/html/
COPY --from=builder /build/*.js /usr/share/nginx/html/
COPY --from=builder /build/*.pdf /usr/share/nginx/html/

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Create non-root user for Nginx
RUN addgroup -g 1001 -S nginx-user && \
    adduser -u 1001 -S nginx-user -G nginx-user && \
    chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx-user:nginx-user /var/run/nginx.pid

USER nginx-user

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]