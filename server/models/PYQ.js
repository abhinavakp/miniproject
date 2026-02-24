import mongoose from 'mongoose';

const pyqSchema = new mongoose.Schema({
    subjectId: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    examType: {
        type: String,
        enum: ['Regular', 'Supply'],
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    tags: [String],
    modules: [String],
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

const PYQ = mongoose.model('PYQ', pyqSchema);
export default PYQ;
