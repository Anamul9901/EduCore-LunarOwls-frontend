"use client";
import { useGetSingleenrollmentQuery } from "@/src/redux/features/enrollment/enrollmentApi";
import { useParams } from "next/navigation";
import React from "react";

const CourseStudents = () => {
  const { coursesid } = useParams();

  const {
    data: getAllCoursesStudent,
    isLoading,
    error,
  } = useGetSingleenrollmentQuery(coursesid);
  const enrollmentStudent = getAllCoursesStudent?.data;

  if (isLoading)
    return (
      <div className="text-center text-lg mt-10 text-white">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-lg text-red-500 mt-10">
        Error loading student data
      </div>
    );

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Enrolled Students
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-600 text-left text-gray-300">
          <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
            <tr>
              <th className="border border-gray-600 px-4 py-2">#</th>
              <th className="border border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-600 px-4 py-2">Email</th>
              <th className="border border-gray-600 px-4 py-2">Status</th>
              <th className="border border-gray-600 px-4 py-2">Address</th>
              <th className="border border-gray-600 px-4 py-2">
                Enrollment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {enrollmentStudent && enrollmentStudent.length > 0 ? (
              enrollmentStudent.map((item: any, index: number) => (
                <tr
                  key={item.studentId}
                  className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"} hover:bg-gray-600`}
                >
                  <td className="border border-gray-600 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {item.user.name}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {item.user.email}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {item.user.status}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {item.user.address || "N/A"}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-600 px-4 py-2 text-center text-gray-400">
                  No students enrolled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseStudents;
