import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  options: Array<{ value: string; label: string }>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  required?: RegisterOptions["required"];
}

const SelectField = <T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  required,
}: SelectFieldProps<T>) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="mb-3 form-group">
      {label && <label className="form-label">{label}</label>}
      <select
        className={`form-select ${errors[name] ? "is-invalid" : ""}`}
        {...register(name, { required })}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </div>
  );
};

export default SelectField;
