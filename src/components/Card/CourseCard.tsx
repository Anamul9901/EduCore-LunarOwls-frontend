import React, { useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAddenrollmentMutation } from "@/src/redux/features/enrollment/enrollmentApi";
import { Spinner } from "@nextui-org/spinner";

const CourseCard = ({ courses }: { courses: any }) => {
  // Format the start date to a more readable format
  const formattedStartDate = new Date(courses?.startDate).toLocaleString();
  const [addEnrollment, { isLoading, error }] = useAddenrollmentMutation();
  useEffect(() => {
    if (error) {
      toast.error("Already enrolled");
    }
  }, [error]);
  const handleEnrollCourse = async (courseId: string) => {
    const data = { courseId };
    const res = await addEnrollment(data).unwrap();
    if (res) {
      toast.success(res.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-y-105 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative">
        <img
          className="w-full h-45 object-cover rounded-lg shadow-sm"
          src={
            courses?.photo || "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
          }
          alt={courses?.title || "Product Image"}
          height={300}
          width={300}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Link
            href={`/course/${courses?.id}`}
            className="text-sm px-4 py-2 bg-teal-500 text-white rounded-md shadow-md hover:bg-teal-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 py-2">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-white truncate">
          {courses?.name || "Product Name"}
        </h3>

        {/* Short Description */}
        <Link
          href={`/product/${courses?.id}`}
          className="text-gray-400 text-sm mt-"
        >
          {courses?.description?.slice(0, 50) || "No description available."}...
        </Link>

        {/* Start Date */}
        <p className="text-gray-400 text-sm mt-2">
          <strong>Start Date:</strong>{" "}
          {formattedStartDate || "No start date available."}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center bg-gray-800 p-2">
        {/* Rating */}
        <div className="flex items-center text-teal-400">
          Credits:
          <span className="text-sm"> {courses?.credits || "No Rating"}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleEnrollCourse(courses?.id)}
          className="bg-teal-500 text-white text-sm md:px-4 md:py-2 px-2 py-1 rounded shadow-md hover:bg-teal-600 transition"
        >
          {isLoading ? <Spinner size="sm" /> : "Enroll now"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
