import express from 'express';
import multer from 'multer';
import { analyzePDF, chatWithAI, summarizeQuestion } from '../controllers/aiController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Will define next

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed."));
        }
    }
});

// For now, let's keep it open or implement simple check if protect is not ready
router.post('/analyze-pdf', upload.single('pdf'), analyzePDF);
router.post('/chat', chatWithAI);
router.post('/summarize', summarizeQuestion);

export default router;
