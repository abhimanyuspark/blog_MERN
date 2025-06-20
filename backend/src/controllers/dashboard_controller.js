const BlogPost = require("../models/BlogPost");
const User = require("../models/User");
const Comment = require("../models/Comment");

const getDashBoardSummery = async (req, res) => {
  try {
    const [
      totalUsers,
      totalBlogPost,
      totalComment,
      published,
      draft,
      aigenerated,
    ] = await Promise.all([
      User.countDocuments(),
      BlogPost.countDocuments(),
      Comment.countDocuments(),
      BlogPost.countDocuments({ isDraft: false }),
      BlogPost.countDocuments({ isDraft: true }),
      BlogPost.countDocuments({ generatedByAi: true }),
    ]);

    const totalViewsResult = await BlogPost.aggregate([
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]);
    const totalViews = totalViewsResult[0]?.total || 0;

    const totalLikesResult = await BlogPost.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);
    const totalLikes = totalLikesResult[0]?.total || 0;

    // Fetch 5 most recent blog posts
    const recentBlogs = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title coverImgUrl views likes");

    // Fetch 5 most recent comments
    const recentComments = await Comment.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "fullName profilePic")
      .populate("post", "title coverImgUrl");

    const totalUsage = await BlogPost.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { tag: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      stats: {
        totalUsers,
        totalBlogPost,
        published,
        draft,
        totalViews,
        totalLikes,
        totalComment,
        aigenerated,
      },
      recentBlogs,
      recentComments,
      totalUsage,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard summary",
      error: error.message,
    });
  }
};

module.exports = { getDashBoardSummery };
