import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/AxiosInstance';

const useFetchNotAllocatedTasks = () => {
    const getNotAllocatedTasks = async () => {
    const response = await axiosInstance.get(
      `/task-allocation/not-allocated-tasks`,
      {withCredentials:true}
    );
    return await response.data.data;
  };
  return useQuery({
    queryKey: ["notAllocatedTasks"],
    queryFn: getNotAllocatedTasks,
  });
}

export default useFetchNotAllocatedTasks