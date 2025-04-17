
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Generate direct download link
exports.generateDownloadLink = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const { path: filePath, originalname } = req.file;

    // Generate a unique ID for the file
    const fileId = uuidv4();
    
    // Create a new path with the original filename
    const fileExtension = path.extname(originalname);
    const newFilename = `${fileId}${fileExtension}`;
    const newFilePath = path.join(__dirname, '../../../uploads', newFilename);

    // Rename the file with the unique ID
    fs.renameSync(filePath, newFilePath);

    // Generate downloadable URL
    const downloadUrl = `${req.protocol}://${req.get('host')}/api/generate-link/download/${fileId}${fileExtension}`;
    
    // Store file metadata in a temporary database or file system
    // For simplicity, we're just storing the file with a unique name
    
    res.status(200).json({
      success: true,
      message: 'Download link generated successfully',
      downloadUrl,
      filename: originalname
    });
  } catch (error) {
    next(error);
  }
};

// Download file using direct link
exports.downloadFile = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../../uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found or link expired' });
    }

    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/zip');

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    next(error);
  }
};
