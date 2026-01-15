import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { User } from "../../types/user.types";
import { signup } from "../../services/auth.service";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      const user = await signup(data);
      console.log("User signed up:", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error?.response?.data?.message ?? error?.response?.statusText
        );
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
          <h2 className="mb-4">Register</h2>
          <InputField<User>
            label="User Name"
            name="name"
            placeholder="Name"
            register={register}
            errors={errors}
            required="Username is required"
          />

          <InputField<User>
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            errors={errors}
            required="Email is required"
            pattern={{ value: /^\S+@\S+$/, message: "Email is invalid" }}
          />

          <InputField<User>
            label="Password"
            name="password"
            type="password"
            placeholder="******"
            register={register}
            errors={errors}
            required="Password is required"
            minLength={{
              value: 6,
              message: "Password must be at least 6 characters",
            }}
          />

          <SelectField<User>
            label="Role"
            name="role"
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "USER", label: "User" },
            ]}
            register={register}
            errors={errors}
            required="Role is required"
          />

          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary px-4 fw-bold" type="submit">
              Register
            </button>
            <div>
              Already have an account?&nbsp;
              <span
                className="text-white fw-bold"
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Login
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
