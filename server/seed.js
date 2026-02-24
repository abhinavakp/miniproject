import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject.js';
import User from './models/User.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
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
            // --- 2019 SCHEME ---
            // S1
            { scheme: '2019', department: 'CSE', semester: 'S1', subjectName: 'Linear Algebra & Calculus', subjectCode: 'MAT101_19' },
            { scheme: '2019', department: 'CSE', semester: 'S1', subjectName: 'Engineering Mechanics', subjectCode: 'EST100_19' },
            { scheme: '2019', department: 'CSE', semester: 'S1', subjectName: 'Engineering Chemistry', subjectCode: 'CYT100_19' },
            { scheme: '2019', department: 'CSE', semester: 'S1', subjectName: 'BCE & BME', subjectCode: 'EST120_19' },
            { scheme: '2019', department: 'CSE', semester: 'S1', subjectName: 'Life Skills', subjectCode: 'HUT101_19' },
            // S2
            { scheme: '2019', department: 'CSE', semester: 'S2', subjectName: 'Vector Calculus Differential Equation and Transforms', subjectCode: 'MAT102_19' },
            { scheme: '2019', department: 'CSE', semester: 'S2', subjectName: 'Engineering Graphics', subjectCode: 'EST110_19' },
            { scheme: '2019', department: 'CSE', semester: 'S2', subjectName: 'BEE & BCE', subjectCode: 'EST130_19' },
            { scheme: '2019', department: 'CSE', semester: 'S2', subjectName: 'Programming in C', subjectCode: 'EST102_19' },
            { scheme: '2019', department: 'CSE', semester: 'S2', subjectName: 'Professional Communication', subjectCode: 'HUT102_19' },
            // S3
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Discrete Mathematical Structures', subjectCode: 'MAT203_19' },
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Data Structures', subjectCode: 'CST201_19' },
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Logic System Design', subjectCode: 'CST203_19' },
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Object Oriented Programming using Java', subjectCode: 'CST205_19' },
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Sustainable Engineering', subjectCode: 'MCN201_19' },
            { scheme: '2019', department: 'CSE', semester: 'S3', subjectName: 'Design Engineering', subjectCode: 'EST200_19' },
            // S4
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Graph Theory', subjectCode: 'MAT206_19' },
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Computer Organization and Architecture', subjectCode: 'CST202_19' },
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Operating Systems', subjectCode: 'CST204_19' },
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Database Management Systems', subjectCode: 'CST206_19' },
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Professional Ethics', subjectCode: 'HUT200_19' },
            { scheme: '2019', department: 'CSE', semester: 'S4', subjectName: 'Constitution of India', subjectCode: 'MCN202_19' },
            // S5
            { scheme: '2019', department: 'CSE', semester: 'S5', subjectName: 'Formal Languages and Automata Theory', subjectCode: 'CST301_19' },
            { scheme: '2019', department: 'CSE', semester: 'S5', subjectName: 'Computer Networks', subjectCode: 'CST303_19' },
            { scheme: '2019', department: 'CSE', semester: 'S5', subjectName: 'Software Engineering', subjectCode: 'CST305_19' },
            { scheme: '2019', department: 'CSE', semester: 'S5', subjectName: 'Microprocessors and Microcontrollers', subjectCode: 'CST307_19' },
            { scheme: '2019', department: 'CSE', semester: 'S5', subjectName: 'Open Elective I', subjectCode: 'CST309_19' },
            // S6
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Compiler Design', subjectCode: 'CST302_19' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Computer Graphics and Image Processing', subjectCode: 'CST304_19' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Algorithm Analysis and Design', subjectCode: 'CST306_19' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Data Science', subjectCode: 'CST312_19' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Web Programming', subjectCode: 'CST322_19' },
            { scheme: '2019', department: 'CSE', semester: 'S6', subjectName: 'Open Elective II', subjectCode: 'CST308_19' },

            // --- 2024 SCHEME ---
            // S1
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Maths for Computing', subjectCode: 'MAT101_24' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Engineering Physics', subjectCode: 'PHT100_24' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Engineering Chemistry', subjectCode: 'CYT100_24' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Python Programming', subjectCode: 'EST102_24' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Engineering Graphics', subjectCode: 'EST110_24' },
            { scheme: '2024', department: 'CSE', semester: 'S1', subjectName: 'Professional Communication', subjectCode: 'HUT102_24' },
            // S2
            { scheme: '2024', department: 'CSE', semester: 'S2', subjectName: 'Linear Algebra', subjectCode: 'MAT102_24' },
            { scheme: '2024', department: 'CSE', semester: 'S2', subjectName: 'Engineering Mechanics', subjectCode: 'EST100_24' },
            { scheme: '2024', department: 'CSE', semester: 'S2', subjectName: 'OOP Java', subjectCode: 'CST102_24' },
            { scheme: '2024', department: 'CSE', semester: 'S2', subjectName: 'Digital Electronics', subjectCode: 'CST104_24' },
            { scheme: '2024', department: 'CSE', semester: 'S2', subjectName: 'Environmental Science', subjectCode: 'MCN102_24' },
            // S3
            { scheme: '2024', department: 'CSE', semester: 'S3', subjectName: 'Discrete Mathematics', subjectCode: 'MAT203_24' },
            { scheme: '2024', department: 'CSE', semester: 'S3', subjectName: 'Data Structures and Algorithms', subjectCode: 'CST201_24' },
            { scheme: '2024', department: 'CSE', semester: 'S3', subjectName: 'Digital Logic & Computer Design', subjectCode: 'CST203_24' },
            { scheme: '2024', department: 'CSE', semester: 'S3', subjectName: 'Programming Languages', subjectCode: 'CST205_24' },
            // S4
            { scheme: '2024', department: 'CSE', semester: 'S4', subjectName: 'Probability & Statistics', subjectCode: 'MAT206_24' },
            { scheme: '2024', department: 'CSE', semester: 'S4', subjectName: 'Operating Systems', subjectCode: 'CST204_24' },
            { scheme: '2024', department: 'CSE', semester: 'S4', subjectName: 'Database Systems', subjectCode: 'CST206_24' },
            { scheme: '2024', department: 'CSE', semester: 'S4', subjectName: 'Computer Organization', subjectCode: 'CST202_24' },
            { scheme: '2024', department: 'CSE', semester: 'S4', subjectName: 'Design Thinking', subjectCode: 'EST200_24' },
            // S5
            { scheme: '2024', department: 'CSE', semester: 'S5', subjectName: 'Computer Networks', subjectCode: 'CST303_24' },
            { scheme: '2024', department: 'CSE', semester: 'S5', subjectName: 'Software Engineering', subjectCode: 'CST305_24' },
            { scheme: '2024', department: 'CSE', semester: 'S5', subjectName: 'Theory of Computation', subjectCode: 'CST301_24' },
            { scheme: '2024', department: 'CSE', semester: 'S5', subjectName: 'Data Analytics', subjectCode: 'CST312_24' },
            { scheme: '2024', department: 'CSE', semester: 'S5', subjectName: 'Professional Elective I', subjectCode: 'CST331_24' },
            // S6
            { scheme: '2024', department: 'CSE', semester: 'S6', subjectName: 'Compiler Design', subjectCode: 'CST302_24' },
            { scheme: '2024', department: 'CSE', semester: 'S6', subjectName: 'Artificial Intelligence', subjectCode: 'CST304_24' },
            { scheme: '2024', department: 'CSE', semester: 'S6', subjectName: 'Machine Learning', subjectCode: 'CST306_24' },
            { scheme: '2024', department: 'CSE', semester: 'S6', subjectName: 'Web Technologies', subjectCode: 'CST322_24' },
            { scheme: '2024', department: 'CSE', semester: 'S6', subjectName: 'Professional Elective II', subjectCode: 'CST332_24' },
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
