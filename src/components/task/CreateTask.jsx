import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "../../utils/inputValidation";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../api/AxiosInstance";
import { alert } from "../../utils/alert";
import FormModal from "../../common/modals/FormModal";

const CreateTask = ({ setCreateTaskModal }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    mode: "onTouched",
    defaultValues: {
      requiredSkills: [],
    },
  });

  const onSubmit = async (data) => {

    await axiosInstance
      .post("/task", data, { withCredentials: true })
      .then((res) => {
        alert.success(res.data.message);
        setCreateTaskModal(false);
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };

  return (
<FormModal onClick={()=> setCreateTaskModal(false)} title={"Add Task"}>

        <form
          className="p-6 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter task title"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.title && (
              <p className=" text-red-600">{errors?.title?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              rows={4}
              {...register("description", { required: true })}
              placeholder="Enter task description"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors?.description && (
              <p className=" text-red-600">{errors?.description?.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                {...register("status", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors?.status && (
                <p className=" text-red-600">{errors?.status?.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                {...register("priority", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors?.priority && (
                <p className=" text-red-600">{errors?.priority?.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Hours
              </label>

              <input
                type="number"
                min="1"
                {...register("estimatedHours", { required: true })}
                placeholder="e.g. 12"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.estimatedHours && (
                <p className=" text-red-600">
                  {errors?.estimatedHours?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>

              <input
                type="date"
                {...register("dueDate", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.dueDate && (
                <p className=" text-red-600">{errors?.dueDate?.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Required Skills
            </label>

            <Controller
              name="requiredSkills"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  value={field.value?.map((skill) => ({
                    value: skill,
                    label: skill,
                  }))}
                  isMulti
                  placeholder="Type skill and press Enter"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions.map((item) => item.value + " ,")) ||
                      [];
                  }}
                />
              )}
            />
            {errors?.requiredSkills && (
              <p className=" text-red-600">{errors?.requiredSkills?.message}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-3 border-t bg-white">
            <button
              onClick={() => setCreateTaskModal(false)}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
     </FormModal>
  );
};

export default CreateTask;
