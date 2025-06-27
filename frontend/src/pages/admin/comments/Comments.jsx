import { useEffect } from "react";
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
      <div className="flex gap-2 flex-col">
        {comments?.map((c) => (
          <CommentCard
            key={c?._id}
            comment={c}
            onDelete={() => onDelete(c?._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
