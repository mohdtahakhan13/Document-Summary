import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const router = express.Router();

router.post("/summarize", async (req, res) => {
  try {
    const { text, length } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const lengthMap = {
      short: 100,
      medium: 250,
      long: 500,
    };

    const wordCount = lengthMap[length] || 100;

    const prompt = `
    You are an expert summarization assistant.
    
    Task:
    Read the text between <<< and >>> and produce a concise, faithful summary.

    Requirements:
    - Length: about ${wordCount} words (${length}).
    - Structure: 
      1) One-line-gist (1 sentence). 
      2) One concise paragraph using the remaining words to explain the main ideas.
      3) A "Key points:" section with 4–8 bullet points (each 8–20 words) that highlight the essential facts or takeaways.
    - Focus: capture the central thesis, main arguments, conclusions, and any recommendations. Exclude trivial examples, raw data tables, and details that do not change the core meaning.
    - Style: clear, neutral, direct. Use complete sentences; avoid filler and speculative language.
    - Faithfulness: do not invent facts. If the text does not state something, do not add it. If asked to infer, label it as inference.
    - Language: match the language of the input text.
    - Output: Plain text only; start with TL;DR on one line, then the paragraph, then "Key points:" with bullets. Do NOT include analysis of how you produced the summary.

    Text to summarize:
    <<<
    ${text}
    >>>
    `;

    const result = await model.generateContent(prompt);
 const response = await result.response;

    const summary =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ Could not generate summary.";
    // const summary = result.response.text();

    res.json({ summary });
  } catch (err) {
    console.error("Summarization error:", err);
    res.status(500).json({ error: "Summarization failed" });
  }
});

// New endpoint for question answering
router.post("/ask", async (req, res) => {
  try {
    const { text, question, history } = req.body;

    if (!text || !question) {
      return res.status(400).json({ error: "No text or question provided" });
    }

    // Build context from previous Q&A if available
    let context = "";
    if (history && history.length > 0) {
      context = "Previous questions and answers for context:\n";
      history.forEach((item, index) => {
        context += `Q: ${item.question}\nA: ${item.answer}\n\n`;
      });
      context += "Now answer this new question based on the document:\n\n";
    }

    const prompt = `
    You are a helpful assistant that answers questions about a document.
    The user will provide the document text and ask a question about it.
    Answer the question based ONLY on the information in the document.
    If the answer cannot be found in the document, say so clearly.
    Do not make up information or use external knowledge.
    Be concise but thorough in your answer.

    ${context}
    Document text:
    <<<
    ${text}
    >>>

    Question: ${question}

    Answer:
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error("Question answering error:", err);
    res.status(500).json({ error: "Question answering failed" });
  }
});

export default router;