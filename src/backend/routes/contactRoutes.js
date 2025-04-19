
const express = require('express');
const router = express.Router();
const { submitContactForm, contactLimiter } = require('../controllers/contactController');

// Apply rate limiting middleware to contact form endpoint
router.post('/submit', contactLimiter, submitContactForm);

module.exports = router;
