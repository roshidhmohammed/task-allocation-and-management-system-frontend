import { useSelector } from "react-redux";

const ProfileInfo = () => {
    const authUserInfo = useSelector((state)=> state.user)


  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            readOnly
            value={authUserInfo.fullName}
            placeholder="John Doe"
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            readOnly
            value={authUserInfo.email}
            placeholder="john@example.com"
            className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
