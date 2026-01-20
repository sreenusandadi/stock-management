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

  return {
    createProduct,
    getProductById,
  };
};

export default useProductService;
