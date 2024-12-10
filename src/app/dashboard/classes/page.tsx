"use client";

import { useGetAllFacultyQuery } from "@/src/redux/features/courseFaculty/courseFacultyApi";

const Classes = () => {
  const { data: getAllCourseFaculty } = useGetAllFacultyQuery(undefined);
  console.log(getAllCourseFaculty)
  return <div>Classes</div>;
};

export default Classes;
