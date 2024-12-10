"use client";
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
        Classes Name: {singleCourse?.name}
      </h1>
      {currentCourseClasses && currentCourseClasses.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
          {currentCourseClasses.map((classItem: any) => (
            <div key={classItem.id} className="mb-4 p-3 border rounded shadow">
              <h2 className="text-xl font-semibold">{classItem.name}</h2>
              <p>
                <strong>Description:</strong> {classItem.description}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(classItem.startTime).toLocaleString()}
              </p>
              <p>
                <strong>Position:</strong> {classItem.position}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {classItem.isDeleted ? "Deleted" : "Active"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes available for this course.</p>
      )}
    </div>
  );
};

export default Classes;
