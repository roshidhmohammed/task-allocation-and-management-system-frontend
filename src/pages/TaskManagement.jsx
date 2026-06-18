import AddTask from "../components/task/AddTask";
import TaskList from "../components/task/TaskList";

const TaskManagement = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6">
      <AddTask />

      <TaskList />
    </div>
  );
};

export default TaskManagement;
