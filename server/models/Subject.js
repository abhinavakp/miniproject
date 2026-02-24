import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    scheme: { type: String, required: true, enum: ['2019', '2024'] },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
