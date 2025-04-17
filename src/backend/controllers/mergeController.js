
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const { v4: uuidv4 } = require('uuid');

// Merge two resource packs
exports.mergeResourcePacks = async (req, res, next) => {
  try {
    // Check if we have both files
    if (!req.files || !req.files['pack1'] || !req.files['pack2']) {
      return res.status(400).json({ success: false, message: 'Please upload both resource packs' });
    }

    const pack1Path = req.files['pack1'][0].path;
    const pack2Path = req.files['pack2'][0].path;

    const pack1Data = fs.readFileSync(pack1Path);
    const pack2Data = fs.readFileSync(pack2Path);

    const mergedZip = new JSZip();

    // Load both zip files
    const zip1 = await JSZip.loadAsync(pack1Data);
    const zip2 = await JSZip.loadAsync(pack2Data);

    // First add all files from pack1
    for (const [filename, file] of Object.entries(zip1.files)) {
      if (!file.dir) {
        const content = await file.async('nodebuffer');
        mergedZip.file(filename, content);
      } else {
        mergedZip.folder(filename);
      }
    }

    // Then add or override with files from pack2
    for (const [filename, file] of Object.entries(zip2.files)) {
      if (!file.dir) {
        const content = await file.async('nodebuffer');
        mergedZip.file(filename, content);
      } else {
        mergedZip.folder(filename);
      }
    }

    // Generate merged zip buffer
    const mergedContent = await mergedZip.generateAsync({ type: 'nodebuffer' });

    // Create unique filename
    const mergedFilename = `merged-pack-${uuidv4()}.zip`;
    const mergedFilePath = path.join(__dirname, '../../../uploads', mergedFilename);

    // Write merged file to disk
    fs.writeFileSync(mergedFilePath, mergedContent);

    // Clean up temp files
    fs.unlinkSync(pack1Path);
    fs.unlinkSync(pack2Path);

    // Generate a temporary download URL
    const downloadUrl = `/api/merge/download/${mergedFilename}`;

    res.status(200).json({
      success: true,
      message: 'Resource packs merged successfully',
      downloadUrl,
      filename: mergedFilename
    });
  } catch (error) {
    next(error);
  }
};

// Download merged resource pack
exports.downloadMergedPack = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../../../uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Set response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/zip');

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Clean up the file after download (optional)
    fileStream.on('close', () => {
      // Wait a bit before deleting to ensure download completes
      setTimeout(() => {
        fs.unlinkSync(filePath);
      }, 60000); // Delete after 1 minute
    });
  } catch (error) {
    next(error);
  }
};
