import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: RegisterOptions["required"];
  pattern?: RegisterOptions["pattern"];
  minLength?: RegisterOptions["minLength"];
}

const InputField = <T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
  required,
  pattern,
  minLength,
}: InputFieldProps<T>) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="mb-3 form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        {...register(name, { required, pattern, minLength })}
      />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </div>
  );
};

export default InputField;
