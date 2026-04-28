const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdfParse = require('pdf-parse'); 
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors()); 
app.use(express.json());

// --- 2. MONGODB CONNECTION ---
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // 5-second timeout for first connection
})
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
        if (err.message.includes("MongooseServerSelectionError") || err.message.includes("Could not connect to any servers")) {
            console.warn("\n💡 PERMANENT FIX: Follow these steps in MongoDB Atlas:");
            console.warn("1. Log in to your Atlas Dashboard.");
            console.warn("2. Go to Security -> Network Access.");
            console.warn("3. Add '0.0.0.0/0' (Allow Access from Anywhere) for development.");
            console.warn("4. Restart this server after saving settings in Atlas.\n");
        }
    });
app.get("/scans", async (req, res) => {
    const scans = await Scan.find()
    res.json(scans)
})
// Database Schema
const ResumeSchema = new mongoose.Schema({
    userId: String, // Clerk User ID
    applicantName: String,
    score: Number,
    strengths: [String],
    improvements: [String],
    summary: String,
    createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', ResumeSchema);

// --- 3. AI & FILE CONFIG ---
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const upload = multer({ storage: multer.memoryStorage() });

// --- 4. ROUTES ---
app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        console.log(`Analyzing: ${req.file.originalname} for User: ${req.body.userId || "Anonymous"}...`);

        // A. Extract text from the PDF buffer
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text;

        // B. Call Groq AI with a strict rubric and 0 temperature
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a cold, professional HR Scoring System. 
                    Analyze the resume based on this strict 100-point rubric:
                    - 20 pts: Professional Experience (Depth and relevance)
                    - 20 pts: Technical Skills (Modernity and matching)
                    - 20 pts: Impact (Quantifiable results like %, $, or scales)
                    - 20 pts: Contact Info & LinkedIn availability
                    - 10 pts: Education & Certs
                    - 10 pts: Layout & ATS Readability

                    Return ONLY a JSON object. No conversational text.
                    Keys: "applicantName", "score" (number), "strengths" (array), "improvements" (array), "summary" (string).`
                },
                { role: "user", content: resumeText }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0, // <--- DETERMINISTIC OUTPUT (Fixes score fluctuation)
            response_format: { type: "json_object" }
        });

        // C. Parse the AI result
        const aiData = JSON.parse(completion.choices[0].message.content);

        // D. Save the result to MongoDB for history
        const newEntry = new Resume({
            userId: req.body.userId || "Anonymous",
            applicantName: aiData.applicantName || "Unknown",
            score: aiData.score || 0,
            strengths: aiData.strengths || [],
            improvements: aiData.improvements || [],
            summary: aiData.summary || ""
        });
        await newEntry.save();

        // E. Send the final object back to React
        res.json(newEntry);

    } catch (error) {
        console.error("Critical Backend Error:", error);
        res.status(500).json({ error: "Analysis engine failed" });
    }
});
/**
 * GET /history
 * Fetches previous scans for your sidebar/history list
 */
app.get('/history', async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(`Fetching history for User: ${userId}`);
        if (!userId) return res.status(400).json({ error: "Missing userId" });

        const history = await Resume.find({ userId }).sort({ createdAt: -1 }).limit(20);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch history" });
    }
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Precision AI Engine running on http://localhost:${PORT}`);
    console.log(`🎯 Logic: Deterministic (Temp 0) using Llama 3.3`);
});