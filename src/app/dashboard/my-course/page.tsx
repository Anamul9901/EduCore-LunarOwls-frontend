"use client";
import { useGetMyEnrollmentQuery } from "@/src/redux/features/enrollment/enrollmentApi";
import React from "react";

const Page = () => {
  const {
    data: getMyEnrollment,
    isLoading,
    error,
  } = useGetMyEnrollmentQuery(undefined);
  const myEnrollment = getMyEnrollment?.data;

  if (isLoading)
    return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500 mt-10">
        Error loading enrollments
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">My Enrollments Course</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {myEnrollment && myEnrollment.length > 0 ? (
          myEnrollment.map((enrollment: any) => (
            <div
              key={enrollment.courseId}
              className="bg-gray-600 border border-gray-200 rounded-lg shadow-md w-72"
            >
              <img
                src={enrollment.course?.photo}
                alt={enrollment.course?.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {enrollment.course?.name}
                </h2>
                <p className="text-sm mt-2">{enrollment.course?.description}</p>
                <p className="text-sm font-medium mt-2">
                  Credits: {enrollment.course?.credits}
                </p>
                <p className="text-sm mt-1">
                  Start Date:{" "}
                  {new Date(enrollment.course?.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  End Date:{" "}
                  {new Date(enrollment.course?.endDate).toLocaleDateString()}
                </p>
                <div>
                  <a className="bg-green-800 px-2 py-1 rounded-md" href={`/dashboard/my-course/class/${enrollment.courseId}`}>
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-600">No enrollments found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
