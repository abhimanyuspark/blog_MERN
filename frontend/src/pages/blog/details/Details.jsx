import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router";
import {
  fetchBlogById,
  fetchBlogs,
  incrementBlogViews,
} from "../../../redux/features/blogSlice";

import BlogLoader from "../../../components/loaders/BlogLoader";
import MarkDown from "../../../components/markdown/MarkDown";
import { Back } from "../../../assets";
import useTheme from "../../../hooks/useTheme";
import RecentsPosts from "./RecentsPosts";
import SharePost from "./SharePost";
import Comments from "./Comments";
import GenerateSummery from "./GenerateSummery";
import Avatar from "../../../components/@comp/Avatar";
import LikePostButton from "./LikePostButton";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [theme] = useTheme();
  const { blog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(incrementBlogViews(id));
    dispatch(fetchBlogById(id));
    dispatch(fetchBlogs({ page: 1 }));
  }, [dispatch, id]);

  if (loading) {
    return <BlogLoader />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="flex sm:gap-6 gap-4 flex-col">
      <div className="flex sm:flex-row flex-col gap-6">
        <div className="flex gap-6 flex-col sm:w-[70%] w-full">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar author={blog?.author} size={45} />
                <div>
                  <p className="text-base-content/70 font-semibold">
                    @{blog?.author?.fullName}
                  </p>
                  <p className="text-base-content/50 text-sm">
                    {new Date(blog?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <GenerateSummery blog={blog} theme={theme} />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {blog?.tags?.map((t, i) => (
                <Link to={`/tag/${t}`} className="badge badge-primary" key={i}>
                  #{t}
                </Link>
              ))}
            </div>
          </div>

          <img
            src={blog?.coverImgUrl || Back}
            alt={blog?.title}
            className="w-full h-90 object-cover rounded"
          />

          <div className="border border-base-300 bg-base-100 rounded-lg p-4">
            <MarkDown
              content={
                blog?.content?.replace(/^<p>/, "")?.replace(/<\/p>$/, "") || ""
              }
              theme={theme === "light" ? true : false}
            />
          </div>
        </div>

        <div className="sm:w-[30%] w-full">
          <RecentsPosts id={id} />
        </div>
      </div>

      <LikePostButton
        postId={blog?._id}
        likes={blog?.likes}
        likedBy={blog?.likedBy || []}
      />

      <SharePost />
      <Comments postId={blog?._id} />
    </div>
  );
};

export default Details;
