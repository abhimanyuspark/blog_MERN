import { useSelector } from "react-redux";
import RecentBlogPostCard from "../../../components/cards/RecentBlogPostCard";

const Trendings = () => {
  const { trendings } = useSelector((state) => state.blog);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">Trending Posts</h3>
      <div className="flex gap-4 flex-col">
        {trendings?.map((t, i) => (
          <RecentBlogPostCard key={i} blog={t} />
        ))}
      </div>
    </div>
  );
};

export default Trendings;
