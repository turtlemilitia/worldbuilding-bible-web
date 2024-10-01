# Stage 1: Development environment
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Production environment using pre-built assets
FROM nginx:alpine AS nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]