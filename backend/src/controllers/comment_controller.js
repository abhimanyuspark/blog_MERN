const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { parentComment, content } = req.body;

    const post = await BlogPost.findById(postId).exec();
    if (!post) {
      return res.status(404).json({ message: "Post not fund" });
    }
    const comment = await Comment.create({
      author: req.user._id,
      post: post,
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "fullName profilePic");

    return res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "fullName profilePic")
      .populate("post", "title coverImgUrl")
      .sort({ createdAt: 1 });

    let commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    let nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all comments for a post
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "fullName profilePic")
      .populate("post", "title coverImgUrl")
      .sort({ createdAt: 1 });

    let commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    let nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.json(nestedComments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(commentId, { content })
      .populate("author", "fullName profilePic")
      .populate("post", "title coverImgUrl");

    if (!comment) return res.status(404).json({ error: "Comment not found" });

    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await Comment.deleteOne({ _id: commentId });
    await Comment.deleteMany({ parentComment: commentId });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getCommentsByPost,
  getAllComments,
};
