"use client";

import { useGetAlluserQuery } from "@/src/redux/features/user/userApi";

const Students = () => {
  const { data: allUser } = useGetAlluserQuery(undefined);
  const allUserData = allUser?.data;
  const filterStudentData = allUserData?.filter(
    (item: any) => item?.role === "student"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Students List</h1>
      {filterStudentData && filterStudentData.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterStudentData.map((student: any) => (
              <tr key={student.id}>
                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                <td className="border border-gray-300 px-4 py-2">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default Students;
