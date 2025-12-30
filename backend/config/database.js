const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    
    // CHỈNH SỬA ĐOẠN NÀY:
    // Chỉ bật SSL nếu không phải môi trường development (hoặc kiểm tra biến env)
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {} // Nếu là dev hoặc docker local thì object rỗng (không SSL)
  }
);

module.exports = sequelize;