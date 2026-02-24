import mongoose from 'mongoose';

const aiLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subjectId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['chat', 'analysis', 'summary'],
        required: true
    },
    question: {
        type: String,
        required: false
    },
    response: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const AILog = mongoose.model('AILog', aiLogSchema);
export default AILog;
