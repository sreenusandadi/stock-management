import { useForm } from "react-hook-form";
import type { Product } from "../../types/product.types";
import InputField from "../forms/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useProductService from "../../services/product.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  setShowModal: (show: boolean) => void;
  setReloadFlag?: Dispatch<SetStateAction<number>>;
  product?: Product;
}

function ProductModalComponent({
  setShowModal,
  setReloadFlag,
  product,
}: Props) {
  const [errorMsg, setErrorMsg] = useState("");
  const { createProduct, updateProduct } = useProductService();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
        stock: product.stock,
        sales: product.sales,
        isFavorite: product.isFavorite,
      });
    }
  }, [product, reset]);

  const onSubmit = async (payload: Product) => {
    try {
      if (product?._id) {
        await updateProduct(product?._id, payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${product.name} updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModal(false);
        navigate("/products");
      } else {
        await createProduct(payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${payload.name} added successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModal(false);
      }
      // trigger parent to refetch products if setter provided
      if (setReloadFlag) {
        setReloadFlag((v: number) => v + 1);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error?.response?.data?.message ?? error?.response?.statusText,
        );
      } else {
        setErrorMsg("Unexpected error occured, try again!");
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${errorMsg ?? "Unexpected Error occured, try again!"}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
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
            <h5 className="modal-title" id="addProductModalLabel">
              {product ? "Update Product" : "Add New Product"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {errorMsg && (
              <p className="text-danger text-center fw-bold">{errorMsg}</p>
            )}
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
            <button className="btn btn-primary">
              {product ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductModalComponent;
