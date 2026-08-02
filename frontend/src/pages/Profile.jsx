import React from "react";
import { getProfile } from "../api/productsApi";
import { FaUserEdit, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-sky-500 to-indigo-600 relative">
          <button className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition cursor-pointer">
            <FaUserEdit />
          </button>

          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
              <img
                src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-20 pb-8 px-6">

          {/* Name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {profile.username}
            </h2>

            <div className="flex justify-center items-center gap-2 text-gray-500 mt-2">
              <FaEnvelope />
              <span>{profile.email}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-6"></div>

          {/* Address Card */}
          <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sky-600 mb-4">
              <FaMapMarkerAlt />
              <h3 className="font-semibold text-lg">Address</h3>
            </div>

            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Street</span>
                <span>{profile.street || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">City</span>
                <span>{profile.city || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">State</span>
                <span>{profile.state || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">PIN Code</span>
                <span>{profile.pinCode || "-"}</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition duration-300">
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;