import { useSelector } from "react-redux";
import RecentBlogPostCard from "../../../components/cards/RecentBlogPostCard";

const RecentsPosts = ({ id }) => {
  const { blogs } = useSelector((state) => state.blog);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-semibold">Recent Blog Posts</h3>

      <div className="flex flex-col gap-4">
        {blogs?.posts?.map((b, i) => {
          if (b?._id !== id) {
            return <RecentBlogPostCard blog={b} key={i} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default RecentsPosts;
