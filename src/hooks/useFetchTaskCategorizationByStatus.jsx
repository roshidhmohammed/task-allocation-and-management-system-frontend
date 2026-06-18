import axiosInstance from '../api/AxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useFetchTaskCategorizationByStatus = () => {
   const getTaskCategorization = async () => {
    const response = await axiosInstance.get(
      `/task/categorized-by-status`,
      {withCredentials:true}
    );
    return await response.data.data;
  };
  return useQuery({
    queryKey: ["taskCatgorization"],
    queryFn: getTaskCategorization,
  });
}

export default useFetchTaskCategorizationByStatus