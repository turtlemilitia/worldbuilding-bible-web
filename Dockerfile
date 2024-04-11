# Stage 1: Development Environment
FROM node:lts-alpine AS development
WORKDIR /app

# Set the environment variable
ENV NODE_ENV development

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code (the rest of your app)
COPY . .

# Expose the port the app runs on
EXPOSE ${PORT:-3000}

# Start the app
CMD ["npm", "start"]

# Stage 2: Production Environment
FROM node:lts-alpine AS production
WORKDIR /app

# Set the environment variable
ENV NODE_ENV production

# Copy package.json and package-lock.json for production
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built files from the development stage
COPY --from=development /app/dist ./dist

# Expose the port the app runs on
EXPOSE ${PORT:-3000}

# Start the app
CMD ["node", "dist/main.js"]