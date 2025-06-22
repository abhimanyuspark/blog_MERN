import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiHeart, FiEye } from "react-icons/fi";
import { Logo } from "../../assets";

const BlogCard = ({ blog }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div
      className={`group relative bg-base-100 rounded-lg border border-base-300  transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-90`}
    >
      <div className="relative overflow-hidden w-full h-3/5">
        <img
          alt={blog?.title}
          src={blog?.coverImgUrl}
          onError={(e) => (e.currentTarget.src = Logo)}
          className="size-full object-cover group-hover:scale-105 transition-all duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-col justify-between gap-2 p-4 h-2/5">
        <div>
          <h4 className="leading-6 text-ellipsis md:text-clip">
            {blog?.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 text-base-content/40">
          <span className="flex items-center gap-1">
            <FiHeart className="text-lg" />
            {blog?.views}
          </span>
          <span className="flex items-center gap-1">
            <FiEye className="text-lg" />
            {blog?.likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
