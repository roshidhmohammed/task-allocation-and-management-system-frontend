import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterSchema } from "../utils/inputValidation";
import axiosInstance from "../api/AxiosInstance";
import { alert } from "../utils/alert";


const Register = () => {
  const navigate =useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userRegisterSchema),
    mode: "onTouched",
  });

  const onSubmit = async(data) => {
    await axiosInstance.post("/auth", data)
    .then((res)=>{
      alert.success(res.data.message)
      navigate("/login")
    })
    .catch((err)=>{
      alert.error(err?.response?.data?.message)
    })
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("fullName", { required: true })}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            {errors?.fullName && (
              <p className=" text-red-600">{errors?.fullName?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            {errors?.email && (
              <p className=" text-red-600">{errors?.email?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            {errors?.password && (
              <p className=" text-red-600">{errors?.password?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
            {errors?.confirmPassword && (
              <p className=" text-red-600">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-600 text-white py-3 rounded-lg font-medium hover:bg-fuchsia-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link to="/login">
            <span className="ml-1 text-fuchsia-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  
  );
};

export default Register;
