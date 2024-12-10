"use client";
import { useGetAllclassByIdQuery } from "@/src/redux/features/class/classApi";
import { useParams } from "next/navigation";
import React from "react";

const StudentClass = () => {
  const { courseid } = useParams();
  const {
    data: getAllClass,
    isLoading,
    error,
  } = useGetAllclassByIdQuery(courseid);

  const myClass = getAllClass?.data;

  if (isLoading)
    return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500 mt-10">
        Error loading classes
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Classes</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-600 text-left ">
          <thead className="bg-gray-950 text-sm uppercase">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Class Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Start Time</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Info</th>
            </tr>
          </thead>
          <tbody>
            {myClass && myClass.length > 0 ? (
              myClass.map((classItem: any, index: number) => (
                <tr
                  key={classItem.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-600"
                  } hover:bg-gray-900`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {classItem.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {classItem.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(classItem.startTime).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {classItem.location || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={`/dashboard/my-course/class-data/${classItem.id}`}
                    >
                      {" "}
                      view
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center ">
                  No classes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentClass;
