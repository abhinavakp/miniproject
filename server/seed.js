import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject.js';
import User from './models/User.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing subjects
        await Subject.deleteMany({});
        await User.deleteMany({ email: 'admin@smartpyq.com' });

        // Create Admin
        const admin = new User({
            name: 'Admin User',
            email: 'admin@smartpyq.com',
            password: 'adminpassword123',
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created: admin@smartpyq.com / adminpassword123');

        const subjects = [
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Compiler Design', subjectCode: 'CST302' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Computer Networks', subjectCode: 'CST304' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Software Engineering', subjectCode: 'CST306' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Introduction to Computing', subjectCode: 'EST100' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Engineering Physics', subjectCode: 'PHT100' },
        ];

        await Subject.insertMany(subjects);
        console.log('Sample subjects seeded successfully.');

        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
