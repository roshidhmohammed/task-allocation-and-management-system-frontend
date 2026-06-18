import { useState } from "react";
import TaskAllocatedTab from "../components/taskAllocation/TaskAllocatedTab";
import TaskNotAllocatedTab from "../components/taskAllocation/TaskNotAllocatedTab";
import TaskAllocationTransaction from "../components/taskAllocation/TaskAllocationTransaction";

const TaskAllocation = () => {
  const [activeTab, setActiveTab] = useState("allocated_tasks");
  return (
    <div className="mt-5 px-3">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl shadow-gray-500 overflow-hidden">
        <div className="border-b">
          <div className="flex flex-col sm:flex-row">
            <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "allocated_tasks"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("allocated_tasks")}
            >
              Allocated Tasks
            </button>

            <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "not_allocated_tasks"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("not_allocated_tasks")}
            >
              Not Allocated Tasks
            </button>

               <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "task_allocation_transactions"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("task_allocation_transactions")}
            >
               Task Allocation Transactions
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 pb-20">
          {activeTab === "allocated_tasks" && <TaskAllocatedTab />}
          {activeTab === "not_allocated_tasks" && <TaskNotAllocatedTab />}
          {activeTab === "task_allocation_transactions" && <TaskAllocationTransaction/>}
        </div>
      </div>
    </div>
  );
};

export default TaskAllocation;
