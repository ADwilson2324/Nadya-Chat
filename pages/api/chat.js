// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenRouter API key' });
  }

  const { messages } = req.body;

  const payload = {
    model: "mistral:instruct",
    messages,
    temperature: 0.8,
    max_tokens: 600,
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://cravetouch.com", // Optional branding
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Nadya’s too shy to answer right now…";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "Something went wrong talking to Nadya." });
  }
}
