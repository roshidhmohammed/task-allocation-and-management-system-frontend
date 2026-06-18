import { useState } from "react";
import Button from "../../common/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreatableSelect from "react-select/creatable";
import FormModal from "../../common/modals/FormModal";
import { skillsSchema } from "../../utils/inputValidation";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/AxiosInstance";
import { alert } from "../../utils/alert";
import { addAuthUser } from "../../slices/user";

const Skills = () => {
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const authUserInfo = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillsSchema),
    mode: "onTouched",
    defaultValues: {
      skills: authUserInfo.skills.length > 0 && authUserInfo.skills,
    },
  });

  const onSubmit = async (data) => {
    await axiosInstance
      .patch("/user/update-skills", data, {
        withCredentials: true,
      })
      .then((res) => {
        alert.success(res.data.message);
        dispatch(addAuthUser(res.data.data));
        setShowAddSkillModal(false);
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button
          name={"Add Skills"}
          bgColor={"bg-red-600"}
          hoverColor={"hover:bg-red-700"}
          textColor={"text-gray-100"}
          onClick={() => setShowAddSkillModal(true)}
        />
      </div>
      {showAddSkillModal && (
        <FormModal
          onClick={() => setShowAddSkillModal(false)}
          title="Add Skills"
        >
          <form
            className="p-6 pb-10 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  value={field?.value.length>0 && field?.value?.filter((skill) => skill?.trim())
                    ?.map((skill) => ({
                      value: skill,
                      label: skill,
                    }))}
                  isMulti
                  placeholder="Type skill and press Enter"
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions?.map((item) => item.value)) ||
                      [];
                  }}
                />
              )}
            />
            {errors?.skills && (
              <p className=" text-red-600">{errors?.skills?.message}</p>
            )}
            <div className="flex justify-center ">
              <Button
                name="submit"
                bgColor={"bg-red-700"}
                hoverColor={"hover:bg-red-800"}
                textColor={"text-gray-100"}
              />
            </div>
          </form>
        </FormModal>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills
        </label>
        <textarea
          rows="4"
          value={authUserInfo.skills}
          placeholder="React, Node.js, MongoDB..."
          className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default Skills;
