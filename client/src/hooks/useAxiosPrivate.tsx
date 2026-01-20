import { useContext, useEffect } from "react";
import useAxios from "./useAxios";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../context/AuthProvider";

const useAxiosPrivate = () => {
  // Implementation of the custom hook
  const { axiosPrivate } = useAxios();
  const { auth } = useContext(AuthContext);
  const { refresh } = useRefreshToken();
  // You can add interceptors or other configurations here for private requests
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          console.log("Refreshed token:", newToken);
          if (newToken) {
            prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosPrivate(prevRequest);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
