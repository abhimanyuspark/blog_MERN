import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../redux/features/blogSlice";
import { BlogCard, FeaturedBlogPost } from "../../../components";
import { Button } from "../../../components/@comp/Buttons";

const Home = () => {
  const { blogs, loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const onLoadMore = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    dispatch(fetchBlogs({ page }));
  }, [dispatch, page]);

  return (
    <div className="flex gap-8 flex-col">
      <FeaturedBlogPost blog={blogs?.posts?.[0]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.posts?.slice(1)?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        {blogs?.totalPages !== page && (
          <Button loading={loading} className="btn-accent" onClick={onLoadMore}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
