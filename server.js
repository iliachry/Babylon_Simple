const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './') // Save files in the root directory
    },
    filename: function (req, file, cb) {
        // Keep original filename
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('./'));
app.use(express.json()); // Add this to parse JSON bodies

// Handle file upload
app.post('/upload-model', upload.single('model'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // Return the path where the file was saved
        res.json({ path: req.file.originalname });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Handle saving settings
app.post('/save-settings', (req, res) => {
    try {
        const settings = req.body;
        fs.writeFileSync('settings.json', JSON.stringify(settings, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        res.status(500).json({ error: 'Failed to save settings' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 