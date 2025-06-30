import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchBlogById } from "../../../redux/features/blogSlice";

import { BlogLoader, MarkDown } from "../../../components";
import { Logo } from "../../../assets";
import useTheme from "../../../hooks/useTheme";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [theme] = useTheme();
  const { blog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!blog) {
    return null;
  }

  return (
    <div>
      {loading && <BlogLoader />}

      <div className="p-6 rounded-lg bg-base-100 border border-base-300">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
        <div className="flex items-center mb-6">
          <img
            src={blog?.author?.profilePic || Logo}
            alt={blog?.author?.fullName}
            onError={(e) => {
              e.currentTarget.src = Logo;
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-base-content/70 font-semibold">
              @{blog?.author?.fullName}
            </p>
            <p className="text-base-content/50 text-sm">
              {new Date(blog?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {blog?.coverImgUrl && (
          <img
            src={blog?.coverImgUrl}
            alt={blog?.title}
            className="w-full h-90 object-cover rounded mb-6"
          />
        )}

        <div className="border border-base-300 bg-base-200 rounded-lg p-4">
          <MarkDown
            content={blog?.content}
            theme={theme === "light" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
