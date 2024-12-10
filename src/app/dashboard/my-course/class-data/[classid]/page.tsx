"use client";
import { useGetAllclassDataQuery } from "@/src/redux/features/classData/classDataApi";
import { useParams } from "next/navigation";
import React from "react";

const ClassData = () => {
  const { classid } = useParams();
  const {
    data: getClassData,
    isLoading,
    error,
  } = useGetAllclassDataQuery(classid);

  const classDatas = getClassData?.data;

  if (isLoading)
    return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-500 mt-10">
        Error loading class data
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        {/* Class Data for Class ID: {classid} */}
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-950  text-sm uppercase">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
             </tr>
          </thead>
          <tbody>
            {classDatas && classDatas.length > 0 ? (
              classDatas.map((dataItem: any, index: number) => (
                <tr
                  key={dataItem.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                  } hover:bg-gray-900`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataItem.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataItem.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {dataItem.classDataType}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center text-gray-600">
                  No class data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassData;
