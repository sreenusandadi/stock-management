import { useForm } from "react-hook-form";
import type { Product } from "../../types/product.types";
import InputField from "../forms/InputField";

function AddProductComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = (data: Product) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<Product>
          name="name"
          placeholder="Product Name"
          label="Product Name"
          register={register}
          errors={errors}
          required
        />
      </form>
    </div>
  );
}

export default AddProductComponent;
