"use client";

import AssignFaculty from "@/src/components/modals/AssignedFacultyModal";
import { useGetSingleCourseQuery } from "@/src/redux/features/course/coursApi";
import { useGetSingleFacultyQuery } from "@/src/redux/features/courseFaculty/courseFacultyApi";
import { useGetAlluserQuery } from "@/src/redux/features/user/userApi";
import { useParams } from "next/navigation";

const SingleCourse = () => {
  const { courseid } = useParams();
  const { data: getSingleCourse } = useGetSingleCourseQuery(courseid);
  const singleCourse = getSingleCourse?.data;
  const { data: getThisCourseFaculty } = useGetSingleFacultyQuery(courseid);
  const currentCoursFacultys = getThisCourseFaculty?.data;

  const getCurrentCourseFacultysId = currentCoursFacultys?.map(
    (item: any) => item.facultyId
  );
  const { data: allUser } = useGetAlluserQuery(undefined);
  const allUserData = allUser?.data;
  const filterFacultyData = allUserData?.filter(
    (item: any) => item?.role === "faculty" && getCurrentCourseFacultysId.includes(item?.id)
  );

  if (!singleCourse) return <p>Loading course details...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{singleCourse.name}</h1>
        <AssignFaculty
          courseid={courseid}
          getCurrentCourseFacultysId={getCurrentCourseFacultysId}
        />
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
      </div>
      <div className="text-white ml-20">
        <h1>Assigned faculty</h1>
        {filterFacultyData?.map((item: any) => (
          <div className="ml-20 border rounded-md ">
            <h1>Name:{item?.name}</h1>
            <h1>Email:{item?.email}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCourse;
