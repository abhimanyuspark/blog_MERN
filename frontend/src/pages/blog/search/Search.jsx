import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { searchBlogs } from "../../../redux/features/blogSlice";
import BlogLoader from "../../../components/loaders/BlogLoader";

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
    <div>
      Search : {query}
      <div>
        {searchResults?.map((b, i) => (
          <div key={i}>{b?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
