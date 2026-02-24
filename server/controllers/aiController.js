import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import { getAIAnalysis } from '../utils/openaiService.js';
import AILog from '../models/AILog.js';

export const analyzePDF = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No PDF file uploaded." });
        }

        const dataBuffer = req.file.buffer;
        const data = await pdf(dataBuffer);
        const text = data.text;
        const { subjectId } = req.body;

        const analysis = await getAIAnalysis(text, 'analysis', { subjectId });
        const analysisData = JSON.parse(analysis);

        // Save to logs
        const log = new AILog({
            userId: req.user.id,
            subjectId,
            type: 'analysis',
            question: "PDF Upload Analysis",
            response: analysisData
        });
        await log.save();

        res.json(analysisData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze PDF." });
    }
};

export const chatWithAI = async (req, res) => {
    try {
        const { subjectId, userMessage } = req.body;

        const reply = await getAIAnalysis(null, 'chat', { subjectId, userMessage });

        // Save to logs
        const log = new AILog({
            userId: req.user.id,
            subjectId,
            type: 'chat',
            question: userMessage,
            response: reply
        });
        await log.save();

        res.json({ aiReply: reply });
    } catch (error) {
        res.status(500).json({ error: "Chat service unavailable." });
    }
};

export const summarizeQuestion = async (req, res) => {
    try {
        const { text, subjectId } = req.body;
        const summary = await getAIAnalysis(text, 'summary');

        // Save to logs
        const log = new AILog({
            userId: req.user.id,
            subjectId,
            type: 'summary',
            question: text,
            response: summary
        });
        await log.save();

        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: "Summarization failed." });
    }
};
