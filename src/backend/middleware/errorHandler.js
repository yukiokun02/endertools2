
const fs = require('fs');
const path = require('path');

const errorHandler = (err, req, res, next) => {
  // Log error to file
  const logDirectory = path.join(__dirname, '../../../logs');
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${req.method} ${req.url} - ${err.stack}\n`;
  
  fs.appendFileSync(path.join(logDirectory, 'error.log'), logMessage);
  
  // Response to client
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
  });
};

module.exports = errorHandler;
