import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = async () => {
    await toast.promise(dispatch(logoutUser()).unwrap(), {
      loading: "Loging out...",
      success: "Logout SuccessFully",
      error: (err) => err,
    });
    navigate("/login");
  };

  return (
    <div onClick={onLogOut}>
      <a>Logout</a>
    </div>
  );
};

export default Logout;
