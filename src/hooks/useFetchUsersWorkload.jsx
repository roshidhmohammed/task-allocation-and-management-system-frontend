import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/AxiosInstance';

const useFetchUsersWorkload = () => {
       const getUsersWorload = async () => {
    const response = await axiosInstance.get(
      `/user/workload`,
      {withCredentials:true}
    );
    return  response.data.data;
  };
  return useQuery({
    queryKey: ["usersWorkload"],
    queryFn: getUsersWorload,
  });

}

export default useFetchUsersWorkload