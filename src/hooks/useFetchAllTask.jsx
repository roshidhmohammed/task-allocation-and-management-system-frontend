import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/AxiosInstance";

const useFetchAllTask = ({ pageNo, status, priority, search,isRefetch }) => {
  const getTasks = async () => {
    const response = await axiosInstance.get(
      `/task`,

      {
        params: {
          pageNo,
          limit: 10,
          search,
          status,
          priority,
        },
        withCredentials: true,
      },
    );
    return await response.data;
  };
  return useQuery({
    queryKey: ["tasks", pageNo, status, priority, search, isRefetch],
    queryFn: getTasks,
  });
};

export default useFetchAllTask;
