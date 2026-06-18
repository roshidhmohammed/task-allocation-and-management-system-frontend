import { useState } from "react";
import Button from "../../common/ui/Button";
import CreateTask from "./CreateTask";

const AddTask = () => {
  const [showCreateTaskModal, setCreateTaskModal] = useState(false)
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>

      <Button
      onClick={()=> setCreateTaskModal(true)}
        name="+ Add Task"
        bgColor={"bg-blue-600"}
        hoverColor={"hover:bg-blue-700"}
        textColor={"text-gray-100"}
      />
      {showCreateTaskModal && (
        <CreateTask setCreateTaskModal={setCreateTaskModal}/>
      )}
       
    </div>
  );
};

export default AddTask;
