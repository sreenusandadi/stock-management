import useAxios from "../hooks/useAxios";
import type { User, UserLogin } from "../types/user.types";

const useAuthService = () => {
  const { api } = useAxios();

  const login = async ({ email, password }: UserLogin) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  };
  const logout = async () => {
    const response = await api.post("/logout");
    return response.data;
  };

  const signup = async (userData: User) => {
    const response = await api.post("/signup", userData);
    return response.data;
  };

  return { login, logout, signup };
};

export default useAuthService;
