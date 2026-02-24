import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import aiRoutes from './routes/aiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import subjectRoutes from './routes/subjects.js';
import pyqRoutes from './routes/pyqs.js';
import syllabusRoutes from './routes/syllabusRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/pyqs', pyqRoutes);
app.use('/api/syllabus', syllabusRoutes);

// Root test route
app.get('/', (req, res) => {
    res.send('Smart PYQ Organizer API is running...');
});

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartpyq';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
    })
    .catch(err => {
        console.error('❌ Database connection error:', err);
        console.warn('The server is running, but database features will be unavailable until MongoDB is started.');
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});
