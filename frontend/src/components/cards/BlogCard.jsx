import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiHeart, FiShare2 } from "react-icons/fi";

const BlogCard = ({ blog, featured = false }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`group relative bg-base-100 h-auto rounded-xl border border-base-300 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        featured ? "lg:col-span-2 lg:row-span-1" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={blog.CoverImgUrl}
          alt={blog.title}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            featured ? "h-80" : "h-80"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Excerpt */}
        <h3
          className={`font-bold mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300 ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {blog.title}
        </h3>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-base-300">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <FiHeart className="w-4 h-4" />
              <span>{blog.likes}</span>
            </span>

            <span>{blog.views} Views</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                liked
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:bg-red-500 hover:text-white"
              }`}
            >
              {liked ? (
                <AiFillHeart className="w-4 h-4" />
              ) : (
                <AiOutlineHeart className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                bookmarked
                  ? "bg-yellow-500 text-white"
                  : "text-gray-600 hover:bg-yellow-500 hover:text-white"
              }`}
            >
              {bookmarked ? (
                <BsBookmarkFill className="w-4 h-4" />
              ) : (
                <BsBookmark className="w-4 h-4" />
              )}
            </button>
            <button className="p-2 text-gray-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
