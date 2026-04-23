import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { query } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are Syntry AI — the official intelligent assistant for Ghana’s Sovereign Real Estate Exchange. Be fast, professional, and helpful.`;

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: query }] }
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
    });

    const reply = result.response.text();

    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      reply: "Sorry, I'm a bit slow right now. Please try again or chat with us on WhatsApp: 053 110 2292" 
    });
  }
}
