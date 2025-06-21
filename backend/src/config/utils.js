const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
};

const blogPostIdeasPrompt = (topic, count) => {
  return `Generate a list of ${count} blog post ideas related to ${topic}.

For each blog idea, return:
- a title
- a 2-line description about the post
- 3 relevant tags
- the tone (e.g., technical, casual, beginner-friendly, etc.)

Return the result as an array of JSON objects in the format:
[
  {
    "title": "",
    "content": "",
    "tags": ["", "", ""],
    "tone": ""
  }
]

Important: Do not add any extra text outside the JSON format. Only return valid JSON.
`;
};

const commentReplyPrompt = (comment) => {
  const author = comment.author?.fullName || "User";
  const content = comment?.content;

  return `You are replying to a comment by ${author} the comment says:
  
  "${content}"
  
  write a thoughtfull, concise and relevant reply to this comment.`;
};

const blogPostSummaryPrompt = (content) => {
  return `You are an AI assistant that summarizes blog posts.

Instructions:
- Read the blog post content below.
- Generate a short, catchy, SEO-friendly title (max 12 words).
- Write a clear, engaging summary of about 300 words.
- At the end of the summary, add a markdown section titled **## What you will learn**.
- Under the heading, list 3-5 key takeaways or skills the reader will learn in bullet points.

Return the result in valid JSON objects with the following structure:

  {
    "title": "Short SEO-friendly title",
    "content": "300-word summary with a markdown section for what you will learn"
  }

Important: Do not include markdown or code blocks around the JSON. Only return valid JSON.

Blog Post Content: 
${content}
`;
};

module.exports = {
  generateToken,
  blogPostIdeasPrompt,
  commentReplyPrompt,
  blogPostSummaryPrompt,
};
