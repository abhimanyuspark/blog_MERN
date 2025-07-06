import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBlogsByTag } from "../../../redux/features/blogSlice";
import BlogLoader from "../../../components/loaders/BlogLoader";

const Tag = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const { byTag, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (tag) {
      dispatch(fetchBlogsByTag(tag));
    }
  }, [dispatch, tag]);

  if (loading) {
    return <BlogLoader />;
  }

  return (
    <div>
      Tag : {tag}
      <div>
        {byTag?.map((b, i) => (
          <div key={i}>{b?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Tag;
