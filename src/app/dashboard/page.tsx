"use client";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: myData } = useGetMyDataQuery(undefined);
  const currentUserData = myData?.data;

  // For hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-slate-600 text-white py-6 text-center rounded-t-lg">
          <h1 className="text-4xl font-bold p-3">Welcome to Your Dashboard</h1>
        </header>

        {/* Profile Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 py-4 ">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <img
              src={currentUserData?.profilePhoto || "https://i.ibb.co/z89cgQr/profile.webp"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl font-semibold ">{currentUserData?.name || "User Name"}</h2>
            <p className=" mt-2">{currentUserData?.bio || "No bio available"}</p>
          </div>
        </section>

        {/* Shop Info - Only for Vendor Role */}
        {currentUserData?.role === "vendor" && (
          <section className="px-6 py-4">
            <h3 className="text-xl font-semibold  text-center">Shop Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold">Followers</h4>
                <p>Follow</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold">Shop Name</h4>
                <p>{currentUserData?.shopName || "Shop Name"}</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold">Shop Title</h4>
                <p>{currentUserData?.shopTitle || "Shop Title"}</p>
              </div>
            </div>
          </section>
        )}

        {/* Actions Section */}
        <section className="px-6 py-4 border-t border-gray-200 flex justify-center items-center space-x-4">
          <ChangePasswordModal />
        </section>

        {/* Account Details */}
        <section className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-2xl font-semibold  mb-4">Account Details</h3>
          <div className="bg-gray-200 p-4 rounded-lg shadow">
            <p className="text-gray-700">
              <strong>Role:</strong> {currentUserData?.role || "No role"}
            </p>
            <p className="text-gray-700">
              <strong>Account Status:</strong> Active
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
