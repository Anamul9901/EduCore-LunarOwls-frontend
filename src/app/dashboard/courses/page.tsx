"use client";

import AddCourseModal from "@/src/components/modals/AddCourseModal";
import UpdateCourseModal from "@/src/components/modals/UpdateCourseModal";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/src/redux/features/course/coursApi";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const Courses = () => {
  const [courseId, setCourseId] = useState("");
  const { data: allCourses } = useGetAllCourseQuery(undefined);
  const allCourseData = allCourses?.data;
  const [deleteCourse] = useDeleteCourseMutation();

  const filterSingleCourse = allCourseData?.filter(
    (item: any) => item.id == courseId
  );

  const handleDeleteCourse = async (id: string) => {
    console.log(id);
    const res = await deleteCourse(id).unwrap();
    if (res) {
      toast.success(res.message);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses List</h1>
      <div>
        <AddCourseModal />
      </div>
      {allCourseData && allCourseData.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">Photo</th>
              <th className="border border-gray-300 px-4 py-2">Faculty</th>
              <th className="border border-gray-300 px-4 py-2">Students</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
              <th className="border border-gray-300 px-4 py-2">Classes</th>
            </tr>
          </thead>
          <tbody>
            {allCourseData.map((course: any) => (
              <tr key={course.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {course.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(course.startDate).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={course.photo}
                    alt={course.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={`/dashboard/courses/${course.id}`}>view</a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={`/dashboard/courses/students/${course.id}`}>view</a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-center items-center gap-2">
                    <div onClick={() => setCourseId(course?.id)}>
                      <UpdateCourseModal
                        filterSingleCourse={filterSingleCourse?.[0]}
                      />
                    </div>
                    <div
                      className="text-red-500 text-xl bg-gray-400 rounded-full p-1"
                      onClick={() => handleDeleteCourse(course?.id)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={`/dashboard/courses/classes/${course.id}`}>
                    <div className="text-green-500 text-xl rounded-full p-1">
                      <FaEye />
                    </div>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default Courses;
