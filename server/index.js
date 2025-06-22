const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const upload = multer({ dest: '../uploads/' });

// Upload folder
app.post('/upload', upload.any(), (req, res) => {
    res.send('Folder uploaded');
});

// List files
app.get('/files', (req, res) => {
    const dir = path.join(__dirname, '../uploads');
    fs.readdir(dir, (err, files) => {
        if (err) return res.status(500).send('Error reading files');
        res.json(files);
    });
});

// Create file
app.post('/create', (req, res) => {
    const { filename, content } = req.body;
    fs.writeFile(`../uploads/${filename}`, content, (err) => {
        if (err) return res.status(500).send('Error creating file');
        res.send('File created');
    });
});

// Edit file
app.post('/edit', (req, res) => {
    const { filename, newContent } = req.body;
    fs.writeFile(`../uploads/${filename}`, newContent, (err) => {
        if (err) return res.status(500).send('Error editing file');
        res.send('File updated');
    });
});

// Delete file
app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    fs.unlink(`../uploads/${filename}`, (err) => {
        if (err) return res.status(500).send('Error deleting file');
        res.send('File deleted');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.send('🎉 MCP File Server is Running!');
  });
  