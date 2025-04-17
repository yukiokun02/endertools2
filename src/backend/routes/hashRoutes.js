
const express = require('express');
const upload = require('../middleware/upload');
const { generateSHA1Hash } = require('../controllers/hashController');

const router = express.Router();

// POST route to generate SHA-1 hash
router.post('/', upload.single('file'), generateSHA1Hash);

module.exports = router;
