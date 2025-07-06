import TopPostsCard from "../../../components/cards/TopPostsCard";

const TopPosts = ({ topBlogs }) => {
  return (
    <div className="bg-base-100 border border-base-300 px-6 py-4 rounded-lg flex gap-6 flex-col">
      <h3 className="font-semibold">Top Posts</h3>
      <div className="flex flex-col gap-4">
        {topBlogs?.slice(0, 3)?.map((blog, index) => (
          <TopPostsCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default TopPosts;
