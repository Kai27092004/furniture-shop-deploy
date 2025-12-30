# --- Stage 1: Build ---
FROM node:22-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build production (tạo thư mục dist)
RUN npm run build

# --- Stage 2: Serve bằng Nginx ---
FROM nginx:alpine as production-stage

# Copy file build từ stage 1 sang thư mục html của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy file cấu hình nginx custom vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]