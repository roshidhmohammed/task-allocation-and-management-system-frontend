import Table from "../../common/ui/Table";
import { WorkloadTableHeaderItems } from "../../constants/tableHeaders/WorkloadTableHeaders";
import useFetchUsersWorkload from "../../hooks/useFetchUsersWorkload";

const WorkLoadManagement = () => {

  const {data} = useFetchUsersWorkload()
  
  return (
    <div className="py-10">
  
      <Table
        columns={WorkloadTableHeaderItems}
        title="Users Workload"
        data={data}
        currentPage={1}
        hasPaginationNeeded={false}
        totalPages={10}
        hasPaginationNeeded={false}      />
    </div>
  );
};

export default WorkLoadManagement;
