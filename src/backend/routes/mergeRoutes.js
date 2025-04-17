
const express = require('express');
const upload = require('../middleware/upload');
const { mergeResourcePacks, downloadMergedPack } = require('../controllers/mergeController');

const router = express.Router();

// Configure multer to handle two files
const multiUpload = upload.fields([
  { name: 'pack1', maxCount: 1 },
  { name: 'pack2', maxCount: 1 }
]);

// POST route to merge resource packs
router.post('/', multiUpload, mergeResourcePacks);

// GET route to download merged resource pack
router.get('/download/:filename', downloadMergedPack);

module.exports = router;
