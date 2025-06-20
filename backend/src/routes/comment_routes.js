const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
  getCommentsByPost,
  getAllComments,
} = require("../controllers/comment_controller");
const protectedRoute = require("../middlewares/protectedRoute");

router.get("/", getAllComments);

router.post("/:postId", protectedRoute, createComment);
router.get("/:postId", getCommentsByPost);
router.put("/:commentId", protectedRoute, updateComment);
router.delete("/:commentId", protectedRoute, deleteComment);

module.exports = router;
