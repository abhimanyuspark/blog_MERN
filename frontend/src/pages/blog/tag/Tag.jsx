import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchBlogsByTag,
  fetchTrendingBlogs,
} from "../../../redux/features/blogSlice";
import BlogLoader from "../../../components/loaders/BlogLoader";
import BlogCard from "../../../components/cards/BlogCard";
import Trendings from "../../../pages/blog/home/Trendings";

const Tag = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const { byTag, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (tag) {
      dispatch(fetchBlogsByTag(tag));
      dispatch(fetchTrendingBlogs());
    }
    return () => {};
  }, [dispatch, tag]);

  if (loading) {
    return <BlogLoader />;
  }

  return (
    <div className="flex gap-6 sm:flex-row flex-col">
      <div className="flex gap-6 flex-col sm:w-[70%] w-full">
        <div className="bg-info flex items-center flex-col gap-2 justify-center px-4 py-8 rounded-lg">
          <p className="text-2xl font-bold text-white">#{tag}</p>
          <p className="text-sm text-info-content/50">
            Showing <span className="text-lg text-white">{byTag?.length}</span>{" "}
            posts tagged with #{tag}
          </p>
        </div>

        {!byTag?.length > 0 && (
          <div className="text-center text-sm text-base-content/60">
            -- No Result Found --
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {byTag?.map((b, i) => (
            <BlogCard blog={b} key={i} />
          ))}
        </div>
      </div>

      <div className="sm:w-[30%] w-full">
        <Trendings />
      </div>
    </div>
  );
};

export default Tag;
