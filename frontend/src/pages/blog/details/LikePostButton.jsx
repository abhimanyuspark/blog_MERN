import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/@comp/Buttons";
import { PiHandsClapping, PiHandsClappingFill } from "react-icons/pi";
import { likeBlog } from "../../../redux/features/blogSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const LikePostButton = ({ postId, likes = 1, likedBy }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userLikedBy = likedBy?.includes(user?._id);

  const onLike = () => {
    if (user) {
      dispatch(likeBlog(postId));
    } else {
      toast.error("Please login to like this post");
      navigate("/login");
    }
  };

  return (
    <div className="fixed bottom-10 right-10">
      <Button
        className={`${
          userLikedBy ? "btn-success" : "btn-accent"
        } btn-lg text-2xl rounded-4xl`}
        onClick={onLike}
      >
        {userLikedBy ? <PiHandsClappingFill /> : <PiHandsClapping />}
        <span className="text-base truncate w-auto max-w-20">{likes}</span>
      </Button>
    </div>
  );
};

export default LikePostButton;
