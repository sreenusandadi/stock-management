import useAxios from "../hooks/useAxios";
import type { Product } from "../types/product.types";

const useProductService = () => {
  const { axiosPrivate } = useAxios();

  const createProduct = async (payload: Product) => {
    const res = await axiosPrivate.post("/products", payload);
    return res.data;
  };

  const getProductById = async (id: string): Promise<Product> => {
    const res = await axiosPrivate.get(`/products/${id}`);
    return res.data;
  };

  const updateProduct = async (id: string, payload: Product) => {
    const res = await axiosPrivate.put(`/products/${id}`, payload);
    return res.data;
  };

  const deleteProduct = async (id: string) => {
    const res = await axiosPrivate.delete(`/products/${id}`);
    return res.data;
  };

  return {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
  };
};

export default useProductService;
