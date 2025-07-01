import { Link } from "react-router";
import { Back } from "../../assets";

const RecentBlogPostCard = ({ blog }) => {
  return (
    <div className="flex gap-4 p-4 bg-base-100 hover:shadow-lg rounded-xl transition-shadow duration-200">
      <div className="w-15 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          src={blog?.coverImgUrl || Back}
          alt={blog?.title || "Blog Cover"}
        />
      </div>

      <h4 className="font-semibold text-sm hover:text-primary transition-colors duration-150 line-clamp-2 leading-5">
        <Link to={`/details/${blog?._id}`}>{blog?.title}</Link>
      </h4>
    </div>
  );
};

export default RecentBlogPostCard;
