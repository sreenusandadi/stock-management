import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import usePrivateAxios from "./useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

function useProducts(reloadFlag?: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const axiosPrivate = usePrivateAxios();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMonted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/products", {
          signal: controller.signal,
        });
        const data = await response.data;
        setError(null);
        if (isMonted) setProducts(data);
      } catch (error: unknown) {
        const err = error as { name?: string; message: string };
        setError(err.message ?? "Failed to fetch Products");
        if (err?.name === "CanceledError") {
          console.log("Fetch aborted");
        } else {
          navigate("/login", { state: { from: location }, replace: true });
          console.error("Error fetching products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMonted = false;
      controller.abort();
    };
  }, [reloadFlag]);

  return { products, loading, error };
}

export default useProducts;
