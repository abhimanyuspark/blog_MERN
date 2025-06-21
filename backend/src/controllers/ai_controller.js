const { GoogleGenAI } = require("@google/genai");
const {
  blogPostIdeasPrompt,
  blogPostSummaryPrompt,
  commentReplyPrompt,
} = require("../config/utils");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;
    if (!title && !tone) {
      return res.status(400).json({ error: "Title and Tone is required" });
    }

    const prompt = `Write a markdown-formatted blog-post titled ${title}. Use a ${tone} tone. Inculde an introduction , subheadings, code example if relevent and a conclusion.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;

    res.json(raw);
  } catch (error) {
    res
      .status(500)
      .json({ error: "AI generateBlogPost failed", details: error.message });
  }
};

const generateBlogPostIdeas = async (req, res) => {
  try {
    const { topic, count = 2 } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = blogPostIdeasPrompt(topic, count);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;

    const cleared = raw
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleared);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "AI generateBlogPostIdeas failed",
      details: error.message,
    });
  }
};

const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;
    if (!author && !content) {
      return res
        .status(400)
        .json({ error: "Author and Content object are required" });
    }

    const prompt = commentReplyPrompt({ author, content });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;

    res.json(raw);
  } catch (error) {
    res.status(500).json({
      error: "AI generateCommentReply failed",
      details: error.message,
    });
  }
};

const generatePostSummery = async (req, res) => {
  try {
    const { content, length = "short" } = req.body;
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const prompt = blogPostSummaryPrompt(content, length);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;

    const cleared = raw
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleared);

    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "AI generatePostSummery failed", details: error.message });
  }
};

module.exports = {
  generateBlogPost,
  generateBlogPostIdeas,
  generateCommentReply,
  generatePostSummery,
};
