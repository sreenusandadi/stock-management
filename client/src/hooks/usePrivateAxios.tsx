import { useEffect } from "react";
import useAxios from "./useAxios";

const usePrivateAxios = () => {
  // Implementation of the custom hook
  const api = useAxios();
  // You can add interceptors or other configurations here for private requests
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      // Add authorization token or other headers here
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle errors globally
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [api]);

  return api;
};

export default usePrivateAxios;
