import Button from "../../common/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { availableWorkingHoursSchema } from "../../utils/inputValidation";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { alert } from "../../utils/alert";
import { addAuthUser } from "../../slices/user";
import WorkingDays from "./WorkingDays";

const Availability = () => {
  const authUserInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availableWorkingHoursSchema),
    mode: "onTouched",
    defaultValues: {
      availableWorkingHours: authUserInfo.avaialableWorkingHours,
    },
  });

  const onSubmitAvailableWorkingHours = async (data) => {
    await axiosInstance
      .patch("/user/update-available-hours", data, { withCredentials: true })
      .then((res) => {
        alert.success(res.data.message);
        dispatch(addAuthUser(res.data.data));
        navigate("/");
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="space-y-5 pb-10">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Available Hours per day
        </label>
        <form
          className=" flex justify-between gap-2"
          onSubmit={handleSubmit(onSubmitAvailableWorkingHours)}
        >
          <input
            type="number"
            {...register("availableWorkingHours", {
              required: true,
              valueAsNumber: true,
            })}
            min={0}
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {authUserInfo.avaialableWorkingHours !==
            watch("availableWorkingHours") && (
            <Button
              name={"edit"}
              bgColor={"bg-blue-600"}
              textColor={"text-gray-100"}
              hoverColor={"hover:bg-blue-700"}
            />
          )}
          {errors?.availableWorkingHours && (
            <p className=" text-red-600">
              {errors?.availableWorkingHours?.message}
            </p>
          )}
        </form>
      </div>

      <WorkingDays />
    </div>
  );
};

export default Availability;
