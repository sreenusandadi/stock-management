import axios from "axios";

const useAxios = () => {
  const api = axios.create({
    baseURL: "https://api.example.com",
    timeout: 1000,
  });

  return api;
};

export default useAxios;
