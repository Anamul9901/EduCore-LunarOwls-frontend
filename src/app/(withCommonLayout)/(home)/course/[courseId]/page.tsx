"use client";
import SingleCourseCard from "@/src/components/Card/SingleCourseCard";
import { useGetSingleCourseQuery } from "@/src/redux/features/course/coursApi";
import { useParams } from "next/navigation";

const SingleCourse = () => {
  const { courseId } = useParams();
  console.log(courseId);
  const { data: getSingleCourse } = useGetSingleCourseQuery(courseId);
  const singleCourse = getSingleCourse?.data;
  console.log("first", singleCourse);

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center">
      <SingleCourseCard course={singleCourse} />
    </div>
  );
};

export default SingleCourse;
