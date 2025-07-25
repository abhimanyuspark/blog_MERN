import { Input } from "../../components/@comp/Inputs";
import { Button } from "../../components/@comp/Buttons";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Back, GoogleLogo } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginUser, registerUser } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { validateForm } from "../../utils/validations";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(formData);

    const isValid = Object.keys(error).length === 0;

    if (isValid) {
      try {
        await toast.promise(
          dispatch(registerUser(formData))
            .unwrap()
            .then(() => {
              navigate("/", { replace: true });
            }),
          {
            loading: "Signing...",
            success: "Sign Up SuccessFully",
            error: (err) => {
              return err;
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError(error);
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (res) => onGoogleSuccess(res),
    onError: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  const onGoogleSuccess = async (res) => {
    try {
      await toast.promise(dispatch(googleLoginUser(res["code"])).unwrap(), {
        loading: "Loging...",
        success: "Login SuccessFully",
        error: "Error Throungh Login",
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto md:mx-20 lg:mx-20 my-2">
      <div className="border border-base-300 p-6 bg-base-100 shadow-2xl rounded-lg grid grid-cols-1 lg:grid-cols-[25rem_1fr] gap-0 sm:gap-8">
        <div className="flex flex-col gap-8 pt-5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Create your account</h2>
            <p className="text-base-content/70">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
            <Input
              important
              label={"Name"}
              type="text"
              name="fullName"
              placeholder="Jhon Doe"
              value={formData.fullName}
              error={formError?.fullName}
              onChange={handleChange}
            />
            <Input
              important
              label={"Email"}
              type="text"
              name="email"
              placeholder="Jhon@gmail.com"
              value={formData.email}
              error={formError?.email}
              onChange={handleChange}
            />
            <Input
              important
              label={"Password"}
              name="password"
              value={formData.password}
              error={formError?.password}
              onChange={handleChange}
            />
            <Button
              loading={loading}
              disabled={loading}
              type="submit"
              className="btn-primary"
            >
              Sign up
            </Button>
            <div className="flex items-center gap-2 my-2">
              <div className="flex-grow h-px bg-base-300" />
              <span className="text-xs text-base-content/60">or</span>
              <div className="flex-grow h-px bg-base-300" />
            </div>
            <Button
              type="button"
              className="btn bg-white text-black border-[#e5e5e5]"
              onClick={handleGoogleAuth}
              loading={loading}
              disabled={loading}
            >
              <img src={GoogleLogo} alt="GoogleLogo" />
              Sign up with Google
            </Button>
          </form>

          <p className="text-sm text-base-content/70">
            Have an account?{" "}
            <Link to="/login" className="link link-hover text-primary">
              Login
            </Link>
          </p>
        </div>

        <div className="overflow-hidden rounded-r-lg size-full hidden sm:block">
          <img src={Back} className="size-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
