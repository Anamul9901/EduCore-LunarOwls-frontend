"use client";

import { useGetSingleCourseQuery } from "@/src/redux/features/course/coursApi";
import { useGetAllFacultyQuery } from "@/src/redux/features/courseFaculty/courseFacultyApi";
import { useParams } from "next/navigation";

const SingleCourse = () => {
  const { courseid } = useParams();
  const { data: getSingleCourse } = useGetSingleCourseQuery(courseid);
  const singleCourse = getSingleCourse?.data;

  const { data: assignedFaculty } = useGetAllFacultyQuery(courseid);
  console.log(assignedFaculty);
  const assignedFaultyData = assignedFaculty?.data;
  console.log(assignedFaultyData);

  if (!singleCourse) return <p>Loading course details...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{singleCourse.name}</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Assign Faculty
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={singleCourse.photo}
            alt={singleCourse.name}
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>
        <div>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {singleCourse.description}
          </p>
          <p>
            <span className="font-semibold">Credits:</span>{" "}
            {singleCourse.credits}
          </p>
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {new Date(singleCourse.startDate).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {new Date(singleCourse.endDate).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {singleCourse.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <div>
          faculty data
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
