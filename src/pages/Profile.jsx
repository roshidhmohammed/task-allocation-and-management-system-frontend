import { useState } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import Skills from "../components/profile/Skills";
import Availability from "../components/profile/Availability";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");


  return (
    <div>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex flex-col sm:flex-row">
            <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Info
            </button>

            <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "skills"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>

            <button
              className={`flex-1 px-4 py-3 text-sm sm:text-base font-medium transition-colors ${
                activeTab === "availability"
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("availability")}
            >
              Availability
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 pb-20">
          {activeTab === "profile" && <ProfileInfo />}

          {activeTab === "skills" && <Skills />}

          {activeTab === "availability" && <Availability />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
