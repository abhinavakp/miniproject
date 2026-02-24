import { OpenAI } from 'openai';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

let openai;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
} else {
    console.warn("WARNING: OPENAI_API_KEY is missing or invalid. AI features will be disabled.");
}

export const getAIAnalysis = async (text, taskType, context = {}) => {
    let systemPrompt = "";
    let userPrompt = "";

    switch (taskType) {
        case 'analysis':
            systemPrompt = "You are an expert academic assistant for Kerala Technological University (KTU). Carefully analyze the provided question paper text.";
            userPrompt = `Analyze the following KTU PYQ text for the subject ${context.subjectId}.
            Extracted Text: ${text}
            
            Return a JSON object with:
            - importantTopics: Array of strings
            - repeatedQuestions: Array of strings
            - frequentModules: Array of strings
            - difficulty: 'Easy', 'Medium', or 'Hard'
            - moduleWeightage: Array of objects { module: string, weightage: number } (total weight 100)
            - expectedQuestions: Array of strings for upcoming exams`;
            break;

        case 'chat':
            systemPrompt = `You are a helpful KTU Subject Assistant. You know about the syllabus for ${context.subjectId}. Answer concisely and accurately.`;
            userPrompt = context.userMessage;
            break;

        case 'summary':
            systemPrompt = "You are an expert in summarizing academic questions into concise revision notes.";
            userPrompt = `Summarize the following question(s) into key points and short revision notes:
            ${text}`;
            break;
    }

    if (!openai) {
        return "AI Analysis is currently unavailable because the OpenAI API key is not configured. Please contact the administrator.";
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: taskType === 'analysis' ? { type: "json_object" } : { type: "text" }
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        throw new Error("AI Service failed to respond.");
    }
};
