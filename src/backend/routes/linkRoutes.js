
const express = require('express');
const upload = require('../middleware/upload');
const { generateDownloadLink, downloadFile } = require('../controllers/linkController');

const router = express.Router();

// POST route to generate download link
router.post('/', upload.single('file'), generateDownloadLink);

// GET route to download file
router.get('/download/:filename', downloadFile);

module.exports = router;
