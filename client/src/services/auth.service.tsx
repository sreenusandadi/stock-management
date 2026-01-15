import type { User, UserLogin } from "../types/user.types";
import api from "./api";

export const login = async ({ email, password }: UserLogin) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const signup = async (userData: User) => {
  const response = await api.post("/signup", userData);
  return response.data;
};
