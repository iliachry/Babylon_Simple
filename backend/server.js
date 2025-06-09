const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve backend static files for models and info
app.use('/models', express.static(__dirname));

app.use(express.json()); // Add this to parse JSON bodies

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname); // Save files in the backend directory
    },
    filename: function (req, file, cb) {
        // Keep original filename
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload-model', upload.single('model'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Return the path where the file was saved (relative to /models)
        res.json({ path: `/models/${req.file.originalname}` });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Handle saving settings
app.post('/save-settings', (req, res) => {
    try {
        const settings = req.body;
        fs.writeFileSync(path.join(__dirname, 'model-info.json'), JSON.stringify(settings, null, 2));
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