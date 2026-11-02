import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai"; // Ensure you have this installed, or use your project's Gemini setup

export const casesRouter = Router();

// 1. Define Mongoose Schema & Model for the Case
const caseSchema = new mongoose.Schema({
  scenario: { type: String, required: true },
  genre: { type: String, required: true },
  difficulty: { type: String, required: true },
  suspects: { type: Array, default: [] },
  generatedClues: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

const Case = mongoose.models.Case || mongoose.model("Case", caseSchema);

// 2. Initialize Google Gemini Client
// Make sure GEMINI_API_KEY is set in your backend .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

casesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { scenario, genre, difficulty, suspects } = req.body;

    if (!scenario) {
      return res.status(400).json({ error: "Scenario is required." });
    }

    // Prompt Gemini to generate a mystery based on user inputs
    const prompt = `Generate a short detective mystery case based on the following details:
    - Scenario: ${scenario}
    - Genre: ${genre}
    - Difficulty: ${difficulty}
    - Suspects: ${JSON.stringify(suspects)}
    
    Provide a JSON response with a compelling title, a description, and 3 specific clues.`;

    let aiResponseText = "Clue 1: A mysterious key, Clue 2: A hidden note";
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      if (response && response.text) {
        aiResponseText = response.text;
      }
    } catch (aiError) {
      console.error("Gemini API Error (falling back to mock data):", aiError);
    }

    // 3. Save the generated case to MongoDB Atlas
    const newCase = new Case({
      scenario,
      genre,
      difficulty,
      suspects,
      generatedClues: [aiResponseText],
    });

    const savedCase = await newCase.save();

    return res.status(201).json({
      success: true,
      message: "Case generated and saved to database successfully!",
      data: savedCase,
    });
  } catch (error: unknown) {
    console.error("Error generating case:", error);
    return res.status(500).json({ error: "Internal server error while generating case." });
  }
});