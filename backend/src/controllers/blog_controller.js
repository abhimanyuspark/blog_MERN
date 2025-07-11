const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

// Helper: Validate MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const uploadBlogImage = async (req, res) => {
  try {
    const { coverImgUrl } = req?.body;
    console.log("coverImgUrl received:", coverImgUrl?.slice(0, 50));

    if (!coverImgUrl) {
      return res.status(400).json({ message: "coverImgUrl is required" });
    }

    const upload = await cloudinary.uploader.upload(coverImgUrl, {
      upload_preset: "blog",
      folder: "Blog",
    });
    if (!upload) {
      return res.status(500).json({ message: "Error uploading image" });
    }

    res.status(201).json({ coverImgUrl: upload.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload " + error.message });
  }
};

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title && !content) {
      res.status(400).json({ message: "Title and Content are required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const blogPost = await BlogPost.create({
      ...req.body,
      title,
      content,
      slug,
      author: req.user._id,
    });
    res.status(201).json(blogPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    let filter = {};
    if (status === "published") filter.isDraft = false;
    else if (status === "draft") filter.isDraft = true;

    const posts = await BlogPost.find(filter)
      .populate("author", "fullName profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const [totalCount, allCount, publishedCount, draftCount] =
      await Promise.all([
        BlogPost.countDocuments(filter), // filtered count for pagination
        BlogPost.countDocuments(), // total posts
        BlogPost.countDocuments({ isDraft: false }), // published posts
        BlogPost.countDocuments({ isDraft: true }), // draft posts
      ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allCount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }
    const blogPost = await BlogPost.findById(req.params.id).populate(
      "author",
      "fullName profilePic"
    );
    if (!blogPost)
      return res.status(404).json({ error: "Blog post not found" });
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog post by ID
const updateBlogPost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }
    const { title, content } = req.body;

    if (!title && !content) {
      res.status(400).json({ message: "Title and Content are required" });
    }

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        title,
        content,
        slug,
      },
      { new: true }
    );
    if (!blogPost)
      return res.status(404).json({ error: "Blog post not found" });
    res.json(blogPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a blog post by ID
const deleteBlogPost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost)
      return res.status(404).json({ error: "Blog post not found" });
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// search posts
const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const posts = await BlogPost.find({
      isDraft: false,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).populate("author", "fullName profilePic");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// increment Views on Post
const viewPost = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    if (!blogPost)
      return res.status(404).json({ error: "Blog post not found" });
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like or unlike a blog post
const toggleLikePost = async (req, res) => {
  try {
    const userId = req.user.id; // 👈 Get user ID from auth middleware
    const postId = req.params.id;

    if (!isValidObjectId(postId)) {
      return res.status(400).json({ error: "Invalid blog post ID" });
    }

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    let liked;
    if (blogPost.likedBy.includes(userId)) {
      // 👎 Unlike
      blogPost.likes -= 1;
      blogPost.likedBy.pull(userId); // remove userId from likedBy
      liked = false;
    } else {
      // 👍 Like
      blogPost.likes += 1;
      blogPost.likedBy.push(userId); // add userId to likedBy
      liked = true;
    }

    await blogPost.save();

    res.json({
      _id: blogPost._id,
      likes: blogPost.likes,
      likedBy: blogPost.likedBy,
      liked, // 👈 true if liked, false if unliked
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by trending
const getTopPosts = async (req, res) => {
  try {
    const limit = 5;
    const posts = await BlogPost.find({ isDraft: false })
      .sort({ views: -1, likes: -1 })
      .limit(limit);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by slug
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return res.status(400).json({ error: "Slug is required" });
    }
    const blogPost = await BlogPost.findOne({
      isDraft: false,
      slug: slug.trim(),
    }).populate("author", "fullName profilePic");
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get post by tag
const getPostByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const posts = await BlogPost.find({
      tags: tag.trim(),
      isDraft: false,
    }).populate("author", "fullName profilePic");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
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
};
