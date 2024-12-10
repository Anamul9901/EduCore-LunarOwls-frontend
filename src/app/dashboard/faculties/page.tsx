"use client";

import { useGetAlluserQuery } from "@/src/redux/features/user/userApi";

const Faculties = () => {
  const { data: allUser } = useGetAlluserQuery(undefined);
  const allUserData = allUser?.data;
  const filterFacultyData = allUserData?.filter(
    (item: any) => item?.role === "faculty"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Faculties List</h1>
      {filterFacultyData && filterFacultyData.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterFacultyData.map((faculty: any) => (
              <tr key={faculty.id}>
                <td className="border border-gray-300 px-4 py-2">{faculty.id}</td>
                <td className="border border-gray-300 px-4 py-2">{faculty.name}</td>
                <td className="border border-gray-300 px-4 py-2">{faculty.email}</td>
                <td className="border border-gray-300 px-4 py-2">{faculty.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No faculties found.</p>
      )}
    </div>
  );
};

export default Faculties;
