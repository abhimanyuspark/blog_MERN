const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/protectedRoute");
const {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  searchPosts,
  viewPost,
  toggleLikePost,
  getTopPosts,
  getPostBySlug,
  getPostByTag,
  uploadBlogImage,
} = require("../controllers/blog_controller");
const admin = require("../middlewares/adminOnly");

router.post("/", protectedRoute, admin, createBlogPost);
router.put("/:id", protectedRoute, admin, updateBlogPost);
router.delete("/:id", protectedRoute, admin, deleteBlogPost);

router.get("/", getAllBlogPosts);

router.get("/search", searchPosts);
router.get("/trending", getTopPosts);
router.post("/upload", uploadBlogImage);

router.get("/slug/:slug", getPostBySlug);
router.get("/tag/:tag", getPostByTag);

router.get("/:id", getBlogPostById);

router.post("/:id/views", viewPost);
router.post("/:id/likes", protectedRoute, toggleLikePost);

module.exports = router;
