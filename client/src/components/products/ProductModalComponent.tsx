import { useForm } from "react-hook-form";
import type { Product } from "../../types/product.types";
import InputField from "../forms/InputField";
import axios from "axios";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useProductService from "../../services/product.service";

interface Props {
  setShowModal: (show: boolean) => void;
  setReloadFlag?: Dispatch<SetStateAction<number>>;
}

function ProductModalComponent({ setShowModal, setReloadFlag }: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { createProduct } = useProductService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const onSubmit = async (product: Product) => {
    try {
      await createProduct(product);
      // trigger parent to refetch products if setter provided
      if (setReloadFlag) {
        setReloadFlag((v: number) => v + 1);
      }
      setShowModal(false);
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
    <div>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "#4e5052cc" }}
        tabIndex={-1}
        aria-labelledby="addProductModalLabel"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-dialog modal-dialog-centered"
        >
          <div className="modal-content">
            <div className="modal-header">
              {errorMsg && (
                <p className="text-danger text-center fw-bold">{errorMsg}</p>
              )}
              <h5 className="modal-title" id="addProductModalLabel">
                Add New Product
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <InputField<Product>
                name="name"
                placeholder="Product Name"
                label="Product Name"
                register={register}
                errors={errors}
                required="Product name is required"
              />
              <InputField<Product>
                name="price"
                placeholder="Price"
                label="Price"
                type="number"
                register={register}
                errors={errors}
                required="Price is required"
              />
              <InputField<Product>
                name="stock"
                placeholder="Stock"
                type="number"
                label="Stock"
                register={register}
                errors={errors}
                required="Stock is required"
              />
              <InputField<Product>
                name="sales"
                placeholder="Sales"
                type="number"
                label="Sales"
                register={register}
                errors={errors}
                required="Sales are required"
              />
              <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className={`form-control ${
                    errors["description"] ? "is-invalid" : ""
                  }`}
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors["description"]?.message && (
                  <div className="text-danger">
                    {errors["description"]?.message}
                  </div>
                )}
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="favorite">
                  Is it your favorite product?
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="favorite"
                  {...register("isFavorite")}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModalComponent;
