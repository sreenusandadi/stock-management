import { useContext } from "react";
import useAxios from "./useAxios";
import AuthContext from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const { api } = useAxios();
  // Implementation of the custom hook
  const refresh = async () => {
    // Logic to refresh the token
    try {
      const response = await api.get("/refresh", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const { token, user } = response.data;
      setAuth({
        isAuthenticated: true,
        user,
        token,
      });
      return token;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };
  return { refresh };
};

export default useRefreshToken;
