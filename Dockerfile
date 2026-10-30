# Production Hardened Nginx Image
FROM nginx:1.27-alpine-slim

# Install security updates & remove default nginx files
RUN apk upgrade --no-cache && rm -rf /usr/share/nginx/html/*

# Copy static website files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY llms.txt /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/

# Copy assets and docs folders
COPY assets /usr/share/nginx/html/assets/
COPY docs /usr/share/nginx/html/docs/

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Run as root (Render requires this for free tier)
CMD ["nginx", "-g", "daemon off;"]
