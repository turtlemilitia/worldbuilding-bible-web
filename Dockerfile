# Use an official lightweight nginx image
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY build /usr/share/nginx/html

# Containers run nginx with global directives and daemon off
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
