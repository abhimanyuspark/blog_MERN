import { FiHeart } from "react-icons/fi";
import { Back } from "../../assets/index";

const TopPostsCard = ({ blog }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-4">
        <div className="overflow-hidden w-14 h-14 rounded-md bg-gray-100 flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={blog?.coverImgUrl || Back}
            alt={blog?.title || "Blog Cover"}
          />
        </div>
        <h6 className="font-semibold text-base line-clamp-2">{blog?.title}</h6>
      </div>

      <div className="w-full h-2 bg-base-200 rounded-full">
        <div
          className="h-2 rounded-full bg-pink-500 transition-all"
          style={{
            width: `${Math.min(blog?.views || 0, 100)}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="flex gap-1 items-center">
          <span className="font-medium">{blog?.views}</span>
          <span className="text-xs">views</span>
        </span>
        <span className="flex gap-1 items-center">
          <FiHeart className="text-pink-500" />
          <span className="font-medium">{blog?.likes}</span>
        </span>
      </div>
    </div>
  );
};

export default TopPostsCard;
