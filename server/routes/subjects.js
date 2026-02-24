import express from 'express';
import Subject from '../models/Subject.js';

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
    try {
        const { scheme, department, semester } = req.query;
        const filter = {};
        if (scheme) filter.scheme = scheme;
        if (department) filter.department = department;
        if (semester) filter.semester = semester;

        const subjects = await Subject.find(filter);
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a subject (Admin only - simplification: for now no middleware)
router.post('/', async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
