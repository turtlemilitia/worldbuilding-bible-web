# Stage 1: Build the Vite project
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the build using Caddy (or any other web server you prefer)
FROM caddy:alpine

# Copy the build output from the previous stage to the Caddy web root
COPY --from=build /app/dist /usr/share/caddy

# Serve the app with Caddy by default on port 80
EXPOSE 80

# Start Caddy
CMD ["caddy", "file-server", "--root", "/usr/share/caddy", "--listen", ":80"]