const serverless = require('serverless-http');
const app = require('./server.js'); // Mượn biến app từ file cũ

// Biến đổi app thành handler cho Lambda
module.exports.handler = serverless(app);