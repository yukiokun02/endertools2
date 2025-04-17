
const crypto = require('crypto');
const fs = require('fs');

// Generate SHA-1 hash
exports.generateSHA1Hash = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    // Generate SHA-1 hash
    const sha1Hash = crypto.createHash('sha1').update(fileBuffer).digest('hex');

    // Clean up the temporary file
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'SHA-1 hash generated successfully',
      filename: req.file.originalname,
      sha1Hash,
    });
  } catch (error) {
    next(error);
  }
};
