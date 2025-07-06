import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  fetchCommentsByPostId,
} from "../../../redux/features/commentSlice";
import CommentCard from "./CommentCard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loader from "../../../components/loaders/Loader";
import CommentReplyInput from "../../../components/@comp/CommentReplyInput";
import { Button } from "../../../components/@comp/Buttons";
import { useNavigate } from "react-router";

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { comments, loading } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);

  const [replies, setReplies] = useState(null);
  const [reply, setReply] = useState(null);
  const [add, setAdd] = useState(false);

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
    if (postId) {
      dispatch(fetchCommentsByPostId(postId));
    }
  }, [dispatch, postId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold">Comments</h5>

        <Button
          className="btn-accent btn-sm"
          onClick={() => {
            if (user) {
              setAdd(!add);
            } else {
              toast.error("Please log in to add a comment.");
              naviagte(`/login`);
            }
          }}
        >
          Add Comment
        </Button>
      </div>

      {user && add && (
        <CommentReplyInput
          postId={postId}
          parentComment={""}
          onReply={() => {
            setAdd(!add);
          }}
          author={user}
        />
      )}

      {!comments?.length > 0 && (
        <div className="flex items-center justify-center">
          <p className="text-base-content/50 text-sm">-- No comments yet --</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {comments?.map((c, i) => {
          return (
            <CommentCard
              index={i}
              comment={c}
              key={i}
              onReplies={() => {
                if (i !== replies) {
                  setReplies(i);
                } else {
                  setReplies(null);
                }
              }}
              replies={replies}
              reply={reply}
              onReply={() => {
                if (i !== reply) {
                  setReply(i);
                } else {
                  setReply(null);
                }
              }}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
