import { Controller, useForm } from "react-hook-form";
import Button from "../../common/ui/Button";
import { days } from "../../constants/days";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { workingDaysSchema } from "../../utils/inputValidation";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axiosInstance from "../../api/AxiosInstance";
import { addAuthUser } from "../../slices/user";
import { useEffect } from "react";
import { alert } from "../../utils/alert";

const WorkingDays = () => {
  const authUserInfo = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(workingDaysSchema),
    mode: "onTouched",
    defaultValues: {
      workingDays:[],
    },
  });

  useEffect(() => {
  if (authUserInfo?.workingDays) {
    reset({
      workingDays:authUserInfo.workingDays,
    });
  }
}, [authUserInfo, reset]);

  const onSubmitWorkingDdays = async(data) => {
    await axiosInstance
      .patch("/user/update-working-days", data, { withCredentials: true })
      .then((res) => {
        alert.success(res.data.message);
        dispatch(addAuthUser(res.data.data));
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };

  const selectedWorkingDays =
    watch("workingDays")?.map((day) => day.value) || [];

  const currentWorkingDays = authUserInfo.workingDays || [];

  const hasWorkingDaysChanged =
    JSON.stringify([...selectedWorkingDays].sort()) !==
    JSON.stringify([...currentWorkingDays].sort());


  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Working Days
      </label>
      <form
        className=" flex justify-between  gap-2 pb-10"
        onSubmit={handleSubmit(onSubmitWorkingDdays)}
      >
        <Controller
          name="workingDays"
          control={control}
          render={({ field }) => (
           
            <Select
              closeMenuOnSelect={true}
              onChange={(selectedOptions) => {
                field.onChange(
                  selectedOptions?.map((option) => option.value) || [],
                );
              }}
              value={days.filter((day) => field.value?.includes(day.value)) || field.value}
              isMulti
              options={days}
              className="w-full"
            />
          )}
        />
        {hasWorkingDaysChanged && (
          <Button
            name={"edit"}
            bgColor={"bg-blue-600"}
            textColor={"text-gray-100"}
            hoverColor={"hover:bg-blue-700"}
          />
        )}
        {errors?.workingDays && (
          <p className=" text-red-600">{errors?.workingDays?.message}</p>
        )}
      </form>
    </div>
  );
};

export default WorkingDays;
