const axios = require("axios");

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ result: response.data.choices[0].text.trim() });
  } catch (error) {
    res
      .status(500)
      .json({ error: "AI generation failed", details: error.message });
  }
};

module.exports = { generateText };
