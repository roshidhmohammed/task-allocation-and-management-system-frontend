import Table from '../../common/ui/Table';
import { taskAllocationTransactionHeader } from '../../constants/tableHeaders/taskAllocationTransactionHeader';
import useFetchTaskAllocationTransaction from '../../hooks/useFetchTaskAllocationTransaction';

const TaskAllocationTransaction = () => {
    const {data} = useFetchTaskAllocationTransaction()
  return (
    <div>
      <Table
        columns={taskAllocationTransactionHeader}
        data={data}
        currentPage={1}
        totalPages={10}
        hasPaginationNeeded={false}
      />
    </div>
  );
}

export default TaskAllocationTransaction