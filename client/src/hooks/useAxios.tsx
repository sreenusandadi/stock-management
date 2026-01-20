import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

const useAxios = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  return { api, axiosPrivate };
};

export default useAxios;
