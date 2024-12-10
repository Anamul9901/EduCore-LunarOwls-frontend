"use client";
import AddClassDataModal from "@/src/components/modals/AddClassModal";
import { useGetAllclassByIdQuery } from "@/src/redux/features/class/classApi";
import { useGetSingleCourseQuery } from "@/src/redux/features/course/coursApi";
import { useParams } from "next/navigation";
import React from "react";

const Classes = () => {
  const { courseid } = useParams();
  const { data: getCurrentCourseClass } = useGetAllclassByIdQuery(courseid);
  const currentCourseClasses = getCurrentCourseClass?.data;
  const { data: getSingleCourse } = useGetSingleCourseQuery(courseid);
  const singleCourse = getSingleCourse?.data;
  console.log("Classes:", singleCourse);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Classes for Course: {singleCourse?.name}
      </h1>
      <div className="mb-4">
        <AddClassDataModal courseId={courseid} />
      </div>
      {currentCourseClasses && currentCourseClasses.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="">
            <tr>
              <th className="border-b px-4 py-2 text-left">Class Name</th>
              <th className="border-b px-4 py-2 text-left">Description</th>
              <th className="border-b px-4 py-2 text-left">Start Time</th>
              <th className="border-b px-4 py-2 text-left">Position</th>
              <th className="border-b px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentCourseClasses.map((classItem: any) => (
              <tr key={classItem.id} className="odd:bg-gray-900">
                <td className="border-b px-4 py-2">{classItem.name}</td>
                <td className="border-b px-4 py-2">{classItem.description}</td>
                <td className="border-b px-4 py-2">
                  {new Date(classItem.startTime).toLocaleString()}
                </td>
                <td className="border-b px-4 py-2">{classItem.position}</td>
                <td className="border-b px-4 py-2">
                  {classItem.isDeleted ? "Deleted" : "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No classes available for this course.</p>
      )}
    </div>
  );
};

export default Classes;
