import { Link, useNavigate } from "react-router";
import { Back } from "../../assets";

const RecentBlogPostCard = ({ blog }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/details/${blog?._id}`);
  };

  const tag = blog?.tags?.[0];

  return (
    <div
      className="group/item flex gap-2 flex-col p-3 bg-base-100 hover:shadow-lg rounded-lg transition-shadow duration-200 cursor-pointer shadow"
      onClick={onClick}
    >
      <div>
        <Link
          to={`/tag/${tag}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-accent inline w-auto hover:underline"
        >
          {tag}
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="w-15 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            className="w-full h-full object-cover transition-transform duration-200 group-hover/item:scale-105"
            src={blog?.coverImgUrl || Back}
            alt={blog?.title || "Blog Cover"}
          />
        </div>

        <h4 className="text-sm line-clamp-2 text-base-content/50">
          {blog?.title}
        </h4>
      </div>
    </div>
  );
};

export default RecentBlogPostCard;
