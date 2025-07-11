import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  fetchTrendingBlogs,
} from "../../../redux/features/blogSlice";
import BlogCard from "../../../components/cards/BlogCard";
import FeaturedBlogPost from "../../../components/cards/FeaturedBlogPost";
import { Button } from "../../../components/@comp/Buttons";
import Trendings from "./Trendings";

const Home = () => {
  const { blogs, loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const onLoadMore = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    dispatch(fetchBlogs({ page }));
    dispatch(fetchTrendingBlogs());
  }, [dispatch, page]);

  return (
    <div className="flex gap-6 flex-col">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Blog Posts */}
        <div className="flex gap-6 flex-col sm:w-[70%] w-full">
          <FeaturedBlogPost blog={blogs?.posts?.[0]} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs?.posts?.slice(1)?.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>

        <div className="sm:hidden flex items-center justify-center">
          {loading ||
            (blogs?.totalPages !== page && (
              <Button
                loading={loading}
                className="btn-accent"
                onClick={onLoadMore}
              >
                Load More
              </Button>
            ))}
        </div>

        {/* Trendeing Posts */}
        <div className="sm:w-[30%] w-full">
          <Trendings />
        </div>
      </div>

      <div className="sm:flex hidden items-center justify-center">
        {loading ||
          (blogs?.totalPages !== page && (
            <Button
              loading={loading}
              className="btn-accent"
              onClick={onLoadMore}
            >
              Load More
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Home;
