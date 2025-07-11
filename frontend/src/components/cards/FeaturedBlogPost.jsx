import { Link } from "react-router";
import { Back } from "../../assets";
import Avatar from "../@comp/Avatar";

const FeaturedBlogPost = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="rounded-lg h-full sm:h-80 bg-base-100 shadow-md hover:shadow-xl overflow-hidden flex sm:flex-row flex-col">
      <img
        src={blog?.coverImgUrl || Back}
        alt={blog?.title}
        className="sm:w-1/2 sm:h-full w-full h-60 object-cover"
      />

      <div className="p-4 md:p-6 flex gap-4 flex-col w-full sm:w-1/2">
        <h2 className="text-base md:text-2xl font-semibold leading-5 sm:leading-7.5 hover:link-primary">
          <Link to={`/details/${blog?._id}`}>{blog?.title}</Link>
        </h2>
        <p
          className="text-base-content/70 text-sm line-clamp-4"
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
          <Avatar author={blog?.author} />
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

export default FeaturedBlogPost;
