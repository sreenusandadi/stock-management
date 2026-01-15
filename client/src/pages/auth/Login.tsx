import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";

import type { UserLogin } from "../../types/user.types";
import { login } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/forms/InputField";
import axios from "axios";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const { setAuth } = useContext(AuthContext);

  const onSubmit = async (data: UserLogin) => {
    try {
      const { token, user } = await login(data);
      setErrorMsg("");
      setAuth({ isAuthenticated: true, token, user });
      console.log("Login successful:", token, user);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error?.response?.data?.message);
      } else {
        setErrorMsg("Unexpected error occured, try again!");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-brand">
      <form className="w-100 row" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="p-4 rounded col-md-4 offset-md-4 shadow col-10 offset-1">
          {errorMsg && (
            <p className="text-danger text-center fw-bold">{errorMsg}</p>
          )}
          <h2 className="mb-4">Login</h2>
          <InputField<UserLogin>
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            required="Email is required"
            pattern={{ value: /^\S+@\S+$/, message: "Email is invalid" }}
          />

          <InputField<UserLogin>
            label="Password"
            name="password"
            placeholder="******"
            type="password"
            register={register}
            errors={errors}
            required="Password is required"
          />

          <div className="form-group d-flex align-items-center justify-content-between">
            <button className="btn btn-primary px-4 fw-bold" type="submit">
              Login
            </button>
            <div>
              Don't have an account?&nbsp;
              <Link
                to="/signup"
                className="text-decoration-none text-white fw-bold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
