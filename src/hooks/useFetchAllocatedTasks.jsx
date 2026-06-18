import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/AxiosInstance';

const useFetchAllocatedTasks = () => {
      const getAllocatedTasks = async () => {
    const response = await axiosInstance.get(
      `/task-allocation/allocated-tasks`,
      {withCredentials:true}
    );
    return  response.data.data;
  };
  return useQuery({
    queryKey: ["notAllocatedTasks"],
    queryFn: getAllocatedTasks,
  });
}

export default useFetchAllocatedTasks