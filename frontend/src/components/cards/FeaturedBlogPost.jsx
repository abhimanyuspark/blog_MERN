import { Link } from "react-router";

const FeaturedBlogPost = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className="rounded-xl sm:h-100 h-full overflow-hidden flex sm:flex-row flex-col">
      {blog?.coverImgUrl && (
        <img
          src={blog?.coverImgUrl}
          alt={blog?.title}
          className="w-full sm:h-full h-70 object-cover"
        />
      )}

      <div className="p-4 md:p-6 flex gap-4 flex-col">
        <h2 className="text-2xl md:text-3xl font-bold">{blog?.title}</h2>
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
          <img
            className="rounded-full size-10"
            src={blog?.author?.profilePic}
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

export default FeaturedBlogPost;
