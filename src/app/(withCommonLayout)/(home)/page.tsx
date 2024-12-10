// rafce
"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { useGetAllCourseQuery } from "@/src/redux/features/course/coursApi";
import CourseCard from "@/src/components/Card/CourseCard";

const HomePage = () => {
  const [productLimit, setProductLimit] = useState(10);
  const [productPage, setProductPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const data = { limit: productLimit, page: productPage, searchTerm, category };
  const { data: getAllCourse } = useGetAllCourseQuery(data);
  const allCourse = getAllCourse?.data;
  console.log("first", allCourse);


  const isLoading = false;

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.scrollHeight
      ) {
        setProductLimit((prev) => prev + 10);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <div>
      {/* <HeroSection /> */}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-end pt-4 mx-4">
        <div className="flex flex-col md:flex-row md:gap-2 pb-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:w-60 mb-2 md:mb-0"
          />

        
        </div>
      </div>

      {/* all course */}
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 py-10 gap-4">
        {allCourse?.map((course: any) => <CourseCard courses={course} />)}
      </div>
      <div className="text-center text-2xl">{isLoading && <Spinner />}</div>
    </div>
  );
};

export default HomePage;
