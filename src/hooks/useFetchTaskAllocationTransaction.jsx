import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/AxiosInstance";


const useFetchTaskAllocationTransaction = () => {
 const getTaskAllocationTrans = async () => {
    const response = await axiosInstance.get(
      `/task-allocation/all`,
      {withCredentials:true}
    );
    return await response.data.data;
  };
  return useQuery({
    queryKey: ["taskAllocationTrans"],
    queryFn: getTaskAllocationTrans,
  });
}

export default useFetchTaskAllocationTransaction