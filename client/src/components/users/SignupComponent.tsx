import { useForm } from "react-hook-form";

import type { User } from "../../types/user.types";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { useState } from "react";
import axios from "axios";
import useAuthService from "../../services/auth.service";

type Props = {
  setShowModal: (val: boolean) => void;
};

function SignupComponent({ setShowModal }: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { signup } = useAuthService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    try {
      await signup(data);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error?.response?.data?.message ?? error?.response?.statusText,
        );
      } else {
        setErrorMsg("Unexpected error occured, try again!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMsg && (
        <p className="text-danger text-center fw-bold">{errorMsg}</p>
      )}
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

      <button className="btn btn-primary px-4 fw-bold" type="submit">
        Register
      </button>
    </form>
  );
}

export default SignupComponent;
