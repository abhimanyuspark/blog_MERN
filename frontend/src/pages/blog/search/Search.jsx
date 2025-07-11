import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchBlogs } from "../../../redux/features/blogSlice";
import BlogLoader from "../../../components/loaders/BlogLoader";
import BlogCard from "../../../components/cards/BlogCard";

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (query) {
      dispatch(searchBlogs(query));
    }
  }, [dispatch, query]);

  if (loading) {
    return <BlogLoader />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h5>
        <span className="text-base-content/60">
          Showing search results matching
        </span>
        <span className="ml-2">"{query}"</span>
      </h5>

      {!searchResults?.length > 0 && (
        <div className="text-center text-sm text-base-content/60">
          -- No Search Result Found --
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {searchResults?.map((b, i) => (
          <BlogCard blog={b} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
