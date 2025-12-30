# Sử dụng Node v22 như yêu cầu
FROM node:22-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package để cài đặt dependencies trước (tối ưu cache)
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --production

# Copy toàn bộ source code backend
COPY . .

# Mở port 8080 (như trong server.js)
EXPOSE 8080

# Chạy server
CMD ["node", "server.js"]