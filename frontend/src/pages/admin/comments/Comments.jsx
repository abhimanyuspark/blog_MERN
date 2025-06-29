import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  fetchComments,
} from "../../../redux/features/commentSlice";
import { BlogLoader } from "../../../components";
import CommentCard from "./CommentCard";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Comments = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);

  const [replies, setReplies] = useState(null);
  const [reply, setReply] = useState(null);

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
        await toast.promise(dispatch(deleteComment(id)), {
          loading: "Deleting...",
          success: "Deleted Successfull",
          error: (err) => err,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {loading && <BlogLoader />}
      <div>
        <h3 className="font-semibold">Comments</h3>
      </div>

      {comments.length === 0 && !loading && (
        <div className="w-full flex items-center justify-center text-base">
          -- No Comment Found --
        </div>
      )}

      <div className="flex gap-2 flex-col bg-base-100 border border-base-300 rounded-lg p-4">
        {comments?.map((c, index) => (
          <CommentCard
            key={c?._id}
            comment={c}
            onDelete={onDelete}
            index={index}
            onReply={() => {
              if (index !== reply) {
                setReply(index);
              } else {
                setReply(null);
              }
            }}
            reply={reply}
            onReplies={() => {
              if (index !== replies) {
                setReplies(index);
              } else {
                setReplies(null);
              }
            }}
            replies={replies}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
