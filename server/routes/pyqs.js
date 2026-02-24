import express from 'express';
import multer from 'multer';
import path from 'path';
import PYQ from '../models/PYQ.js';

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Get PYQs for a subject
router.get('/:subjectId', async (req, res) => {
    try {
        const pyqs = await PYQ.find({ subjectId: req.params.subjectId });
        res.json(pyqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Upload PYQ (Admin only)
router.post('/', upload.single('pdf'), async (req, res) => {
    try {
        const { subjectId, year, examType, tags, modules } = req.body;
        const pyq = new PYQ({
            subjectId,
            year,
            examType,
            pdfUrl: req.file ? `/uploads/${req.file.filename}` : '',
            tags: tags ? JSON.parse(tags) : [],
            modules: modules ? JSON.parse(modules) : [],
        });
        await pyq.save();
        res.status(201).json(pyq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete PYQ
router.delete('/:id', async (req, res) => {
    try {
        await PYQ.findByIdAndDelete(req.params.id);
        res.json({ message: 'PYQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
