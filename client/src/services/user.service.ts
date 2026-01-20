import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useUserService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async () => {
    const res = await axiosPrivate.get("/users");
    return res.data;
  };

  return {
    getUsers,
  };
};

export default useUserService;
