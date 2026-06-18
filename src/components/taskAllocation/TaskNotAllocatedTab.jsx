import { useState } from "react";
import Button from "../../common/ui/Button";
import Table from "../../common/ui/Table";
import { TaskAllocationTableColumns } from "../../constants/tableHeaders/TaskAllocationTableHeader";
import useFetchNotAllocatedTasks from "../../hooks/useFetchNotAllocatedTasks";
import axiosInstance from "../../api/AxiosInstance";
import { taskAssigningUsers } from "../../constants/tableHeaders/TaskAssigningUsers";
import { alert } from "../../utils/alert";

const TaskNotAllocatedTab = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [showUsersToBeAssigned, setShowUsersToBeAssigned] = useState(false);

  const { data } = useFetchNotAllocatedTasks();

  const handleAssignUsers = async (row) => {
    setSelectedTask(row);
    setShowUsersToBeAssigned(true);
    await axiosInstance
      .get(`/user/all`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
       
      });
  };

  const assignUser = async () => {
    if (selectedRows.length === 0) {
      return;
    }
    await axiosInstance
      .post(
        "/task-allocation",
        { userId: selectedRows[0], taskId: selectedTask?._id },
        { withCredentials: true },
      )
      .then((res) => {
        alert.success(res.data.message)
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message)
      });
    setShowUsersToBeAssigned(false);
    console.log(selectedRows);
  };
  return (
    <div>
      <Table
        columns={TaskAllocationTableColumns}
        data={data}
        currentPage={1}
        totalPages={10}
        hasPaginationNeeded={false}
        actions={(row) => (
          <div className="flex gap-2">
            <Button
              name="Assign"
              bgColor="bg-blue-600"
              textColor="text-white"
              hoverColor="hover:bg-blue-800"
              onClick={() => handleAssignUsers(row)}
            />
            {showUsersToBeAssigned && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                  <div className=" flex justify-between py-3 px-3">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Assign Users
                    </h2>

                    <button
                      type="button"
                      onClick={() => setShowUsersToBeAssigned(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                    <Table
                      columns={taskAssigningUsers}
                      data={users}
                      currentPage={1}
                      totalPages={10}
                      selectionType="single"
                      selectedRows={selectedRows}
                      onSelectionChange={setSelectedRows}
                      hasPaginationNeeded={false}
                    />
                  </div>
                  <div className=" flex justify-end p-3">
                    <Button
                      name={"Submit"}
                      bgColor="bg-blue-600"
                      textColor="text-white"
                      hoverColor="hover:bg-blue-800"
                      onClick={() => assignUser()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default TaskNotAllocatedTab;
