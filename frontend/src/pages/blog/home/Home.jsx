import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../redux/features/blogSlice";
import { BlogCard } from "../../../components";
import { Button } from "../../../components/@comp/Buttons";
import { useSearchParams } from "react-router";

const Home = () => {
  const { blogs, loading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Sync page state with searchParams
  useEffect(() => {
    const paramPage = Number(searchParams.get("page")) || 1;
    setPage(paramPage);
  }, [searchParams]);

  const onLoadMore = () => {
    setSearchParams({ page: page + 1 });
  };

  useEffect(() => {
    dispatch(fetchBlogs({ page }));
  }, [dispatch, page]);

  return (
    <div className="flex gap-4 flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 *:first:col-span-2 *:first:row-span-1 *:first:h-120 *:nth-[2]:h-120">
        {loading &&
          Array.from({ length: 2 }).map(() => <div className="skeleton"></div>)}

        {blogs?.posts?.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>

      {blogs?.totalPages !== page && (
        <Button loading={loading} className="btn-accent" onClick={onLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default Home;
