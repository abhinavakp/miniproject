import express from 'express';
import { getSyllabusBySubject, addSyllabus } from '../controllers/syllabusController.js';

const router = express.Router();

router.get('/:subjectId', getSyllabusBySubject);
router.post('/', addSyllabus);

export default router;
