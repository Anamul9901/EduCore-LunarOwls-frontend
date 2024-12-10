"use client";

import AddCourseModal from "@/src/components/modals/AddCourseModal";
import { useGetAllCourseQuery } from "@/src/redux/features/course/coursApi";

const Courses = () => {
  const { data: allCourses } = useGetAllCourseQuery(undefined);
  const allCourseData = allCourses?.data;

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
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Credits</th>
              <th className="border border-gray-300 px-4 py-2">Start Date</th>
              <th className="border border-gray-300 px-4 py-2">End Date</th>
              <th className="border border-gray-300 px-4 py-2">Photo</th>
            </tr>
          </thead>
          <tbody>
            {allCourseData.map((course: any) => (
              <tr key={course.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {course.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {course.credits}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(course.startDate).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(course.endDate).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={course.photo}
                    alt={course.name}
                    className="w-16 h-16 object-cover rounded"
                  />
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
