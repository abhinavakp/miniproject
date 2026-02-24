import Syllabus from '../models/Syllabus.js';

export const getSyllabusBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const syllabus = await Syllabus.findOne({ subjectId }).populate('subjectId');
        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found for this subject.' });
        }
        res.json(syllabus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addSyllabus = async (req, res) => {
    try {
        const syllabus = new Syllabus(req.body);
        await syllabus.save();
        res.status(201).json(syllabus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
