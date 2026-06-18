import Widgets from "../common/ui/Widgets";
import WorkLoadManagement from "../components/dashboard/WorkloadManagement";

const Dashboard = () => {
  return (
    <div className="px-5 mt-5">
      <Widgets />
      <WorkLoadManagement/>
    </div>
  );
};

export default Dashboard;
