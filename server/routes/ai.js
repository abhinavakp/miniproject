import express from 'express';
import OpenAI from 'openai';
import AILog from '../models/AILog.js';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chat with AI
router.post('/chat', async (req, res) => {
    try {
        const { userId, subject, question } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an expert engineering academic assistant for Kerala Technological University (KTU). Provide helpful, exam-oriented responses." },
                { role: "user", content: `Subject: ${subject}\nQuestion: ${question}` }
            ],
        });

        const response = completion.choices[0].message.content;

        // Log the interaction
        const aiLog = new AILog({ userId, subject, question, response });
        await aiLog.save();

        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Analyze PYQ (Simplified version for now)
router.post('/analyze', async (req, res) => {
    try {
        const { pyqText } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Analyze the following PYQ text and extract important topics, repeated questions, frequently asked modules, and difficulty level. Respond in JSON format." },
                { role: "user", content: pyqText }
            ],
            response_format: { type: "json_object" }
        });

        res.json(JSON.parse(completion.choices[0].message.content));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
