const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/protectedRoute");
const {
  generateBlogPost,
  generateBlogPostIdeas,
  generateCommentReply,
  generatePostSummery,
} = require("../controllers/ai_controller");

router.post("/generate", protectedRoute, generateBlogPost);
router.post("/generate-ideas", protectedRoute, generateBlogPostIdeas);
router.post("/generate-reply", protectedRoute, generateCommentReply);
router.post("/generate-summery", protectedRoute, generatePostSummery);

module.exports = router;
