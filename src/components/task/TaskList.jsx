import { useState } from "react";
import Button from "../../common/ui/Button";
import Table from "../../common/ui/Table";
import { taskTableHeaderColumns } from "../../constants/tableHeaders/TaskTableHeaders";
import useFetchAllTask from "../../hooks/useFetchAllTask";
import SearchFilter from "./SearchFilter";
import useDebounce from "../../hooks/useDebounce";
import axiosInstance from "../../api/AxiosInstance";
import { alert } from "../../utils/alert";
import EditTask from "./EditTask";
import { useDispatch } from "react-redux";
import { addEditTask } from "../../slices/editTask";

const TaskList = () => {
  const [pageNo, setPageNo] = useState(1);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 500);
  const [isRefetch, setIsRefetch] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useFetchAllTask({
    pageNo,
    status,
    priority,
    search: debouncedValue,
    isRefetch,
  });

  const onNext = () => {
    setPageNo(pageNo + 1);
  };

  const onPrev = () => {
    setPageNo(pageNo - 1);
  };

  const handleDelete = async (row) => {
    const result = await alert.confirm("Are you sure?");
    if (!result) return;
    try {
      const response = await axiosInstance.delete(`/task/${row?._id}`, {
        withCredentials: true,
      });
      if (response.data.message) {
        alert.success(response.data.message);
        setIsRefetch(true);

        setTimeout(() => {
          setIsRefetch(false);
        }, 4000);
      }
    } catch (error) {
      alert.error(error?.response?.data?.message);
    }
  };

  const handleEdit = async (row) => {
    setShowEditTaskModal(true);
    dispatch(addEditTask(row));
  };

  return (
    <div>
      <SearchFilter
        setSearchTerm={setSearchTerm}
        setStatus={setStatus}
        setPriority={setPriority}
        searchTerm={searchTerm}
        status={status}
        priority={priority}
      />
      <Table
        columns={taskTableHeaderColumns}
        data={data?.data}
        currentPage={pageNo}
        totalPages={data?.totalCount}
        onPrevious={() => onPrev()}
        onNext={() => onNext()}
        actions={(row) => (
          <div className="flex gap-2">
            <Button
              name="Edit"
              bgColor="bg-blue-600"
              textColor="text-white"
              hoverColor="hover:bg-blue-800"
              onClick={() => handleEdit(row)}
            />

            <Button
              name="Delete"
              bgColor="bg-red-600"
              textColor="text-white"
              hoverColor="hover:bg-red-800"
              onClick={() => handleDelete(row)}
            />
          </div>
        )}
      />

      {showEditTaskModal && (
        <EditTask
          setShowEditTaskModal={setShowEditTaskModal}
          setIsRefetch={setIsRefetch}
        />
      )}
    </div>
  );
};

export default TaskList;
