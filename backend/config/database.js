const { Sequelize } = require('sequelize');
require('dotenv').config(); // Đảm bảo đã gọi dotenv

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Biến này bạn đã set trên Render
  process.env.DB_USER,       // Biến này bạn đã set trên Render
  process.env.DB_PASSWORD,   // Biến này bạn đã set trên Render
  {
    host: process.env.DB_HOST,         // Biến này bạn đã set trên Render
    port: process.env.DB_PORT,         // <-- DÒNG QUAN TRỌNG ĐƯỢC THÊM VÀO
    dialect: 'mysql',                  // Bạn đang dùng mysql
    logging: false, 
    
    // KHỐI QUAN TRỌNG ĐƯỢC THÊM VÀO ĐỂ SỬA LỖI ETIMEDOUT
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Bắt buộc cho Aiven
      }
    }
  }
);

module.exports = sequelize;