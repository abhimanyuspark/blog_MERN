import { Back, Logo } from "../../assets";
import { Link } from "react-router";

const BlogCard = ({ blog }) => {
  return (
    <div
      className={`group relative bg-base-100 rounded-lg border border-base-300  transition-all duration-500 hover:shadow-2xl`}
    >
      <div className="relative overflow-hidden w-full rounded-t-lg">
        <img
          alt={blog?.title}
          src={blog?.coverImgUrl || Back}
          className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-col justify-between gap-4 p-4">
        <h5 className="leading-5 font-semibold line-clamp-2 hover:link-primary">
          <Link to={`/details/${blog?._id}`}>{blog?.title}</Link>
        </h5>
        <p
          className="text-base-content/70 text-sm line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        />

        <div className="flex gap-2 items-center flex-wrap">
          {blog?.tags?.map((tag, index) => (
            <Link
              key={index}
              to={`/tag/${tag}`}
              className="badge badge-soft badge-sm cursor-pointer"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="flex gap-2">
          <img
            className="rounded-full size-10"
            src={blog?.author?.profilePic || Logo}
          />
          <div className="text-sm text-base-content/50 flex flex-col">
            <span className="break-words">@{blog?.author?.fullName}</span>
            <span>
              {new Date(blog?.updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
