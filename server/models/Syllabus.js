import mongoose from 'mongoose';

const syllabusSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    modules: [{
        moduleNumber: { type: Number, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true }, // Markdown supported
    }],
    syllabusPdfUrl: { type: String }, // Link to official KTU syllabus PDF
}, { timestamps: true });

export default mongoose.model('Syllabus', syllabusSchema);
