import Table from "../../common/ui/Table";
import { TaskAllocationTableColumns } from "../../constants/tableHeaders/TaskAllocationTableHeader";
import useFetchAllocatedTasks from "../../hooks/useFetchAllocatedTasks";

const TaskAllocatedTab = () => {
  const { data } = useFetchAllocatedTasks();

  return (
    <div>
      <Table
        columns={TaskAllocationTableColumns}
        data={data}
        currentPage={1}
        totalPages={10}
        hasPaginationNeeded={false}
      />
    </div>
  );
};

export default TaskAllocatedTab;
