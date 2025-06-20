import { Input } from "../../components/@comp/Inputs";
import { Button } from "../../components/@comp/Buttons";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogo } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginUser } from "../../redux/features/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({ ...formError, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (res) => onGoogleSuccess(res),
    onError: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  const onGoogleSuccess = async (res) => {
    try {
      await dispatch(googleLoginUser(res["code"])).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto md:mx-20 lg:mx-90 my-5">
      <div className="flex flex-col gap-8 rounded-xl border border-base-300 p-8 bg-base-100">
        <h2 className="text-center">Login</h2>
        <form className="flex gap-4 flex-col">
          <Input
            important
            label={"Email"}
            type="email"
            name="email"
            placeholder="Jhon@gmail.com"
            value={formData.email}
            error={formError?.email}
            onChange={handleChange}
            required
          />
          <Input
            important
            label={"Password"}
            type={show ? "text" : "password"}
            name="password"
            value={formData.password}
            error={formError?.password}
            show={show}
            setShow={setShow}
            onChange={handleChange}
            required
          />
          <Button type="button" onClick={handleSubmit} className="btn-primary">
            Login
          </Button>
          <Button
            type="button"
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleAuth}
            loading={loading}
            disabled={loading}
          >
            <img src={GoogleLogo} alt="GoogleLogo" />
            Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
