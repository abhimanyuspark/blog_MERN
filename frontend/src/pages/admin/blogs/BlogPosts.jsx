import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogs } from "../../../redux/features/blogSlice";
import { BlogLoader } from "../../../components";
import { Button } from "../../../components/@comp/Buttons";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PostCard from "./PostCard";
import { useNavigate } from "react-router";

const BlogPosts = () => {
  const { blogs, loading, success } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const statusData = [
    { label: "all", count: blogs?.counts?.all || 0 },
    { label: "published", count: blogs?.counts?.published || 0 },
    { label: "draft", count: blogs?.counts?.draft || 0 },
  ];

  const onLoadMore = () => {
    setPage((p) => p + 1);
  };

  const onStatusChange = (s) => {
    setStatus(s.label);
    setPage(1);
  };

  const onEdit = (id) => {
    navigate(`/admin/blog-posts/edit/${id}`);
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await toast.promise(dispatch(deleteBlog(id)), {
          loading: "Deleting...",
          success: "Deleted Successfull",
          error: (err) => err,
        });
        dispatch(fetchBlogs({ page, status }));
      }
    });
  };

  useEffect(() => {
    dispatch(fetchBlogs({ page, status }));
  }, [dispatch, page, status]);

  return (
    <div>
      {loading && <BlogLoader />}

      <div className="flex gap-6 flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Blog Posts</h3>
          <Button
            className="btn-primary"
            onClick={() => {
              navigate(`/admin/blog-posts/create`);
            }}
          >
            <FiPlus className="text-xl font-bold" /> Create Posts
          </Button>
        </div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-border">
          {statusData.map((s, i) => (
            <div
              role="tab"
              className={`tab capitalize flex gap-2 ${
                status === s.label ? "tab-active" : ""
              }`}
              key={i}
              onClick={() => {
                onStatusChange(s);
              }}
            >
              <span> {s.label}</span>
              <span className="size-5 text-sm flex text-accent-content items-center justify-center rounded-full bg-accent">
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {!loading && success && blogs?.posts?.length === 0 && (
          <div className="flex items-center justify-center p-2 text-base-content/50">
            No posts found
          </div>
        )}

        {/* Blogs */}
        <div className="flex gap-2 flex-col">
          {blogs?.posts?.map((post) => (
            <PostCard
              key={post?._id}
              blog={post}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {blogs?.posts?.length > 0 && page !== blogs?.totalPages && (
          <div className="flex items-center justify-center">
            <Button
              loading={loading}
              type="button"
              className="btn-accent"
              onClick={onLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
