const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const mergeRoutes = require('./routes/mergeRoutes');
const linkRoutes = require('./routes/linkRoutes');
const hashRoutes = require('./routes/hashRoutes');
const errorHandler = require('./middleware/errorHandler');

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory, { recursive: true });

// Create activity log stream
const accessLogStream = rfs.createStream('activity.log', {
  interval: '1d',
  path: logDirectory
});

// Create error log stream
const errorLogStream = rfs.createStream('error.log', {
  interval: '1d',
  path: logDirectory
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', { stream: accessLogStream }));

// Static files (for production)
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist');
  app.use(express.static(distPath));
}

// API Routes
app.use('/api/merge', mergeRoutes);
app.use('/api/generate-link', linkRoutes);
app.use('/api/generate-sha1', hashRoutes);

// Error handling middleware
app.use(errorHandler);

// Serve React app for any other routes (production only)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
  fs.appendFileSync(
    path.join(logDirectory, 'error.log'),
    `\n${new Date().toISOString()} - Uncaught Exception: ${error.message}\n${error.stack}\n`
  );
  console.error('Uncaught Exception:', error);
  // Keep the process running, but log the error
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
