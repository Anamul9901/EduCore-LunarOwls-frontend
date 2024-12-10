import Link from "next/link";

const SingleCourseCard = ({ course }: { course: any }) => {
  // Format the start and end date to a more readable format
  const formattedStartDate = new Date(course?.startDate).toLocaleString();
  const formattedEndDate = new Date(course?.endDate).toLocaleString();

  return (
    <div className="py-16">
      <div className="max-w-sm mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-y-105 hover:shadow-2xl">
        {/* Product Image */}
        <div className="relative">
          <img
            className="w-full h-45 object-cover rounded-lg shadow-sm"
            src={
              course?.photo || "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
            }
            alt={course?.title || "Product Image"}
            height={300}
            width={300}
          />
        </div>

        {/* Product Details */}
        <div className="px-4 py-2 space-y-2">
          {/* Shop Information */}
          <div className="flex items-center gap-3 pb-1">
            <Link href={`/shop/${course?.shopId}`}>
              <img
                src={
                  course?.shop?.logo ||
                  "https://i.ibb.co/kBNtTmC/No-Image-Available.jpg"
                }
                alt="Shop Logo"
                className="w-10 h-10 rounded-full border-2 border-teal-400"
              />
            </Link>
            <Link
              href={`/shop/${course?.shop?.id}`}
              className="text-teal-400 text-sm font-bold hover:text-teal-300"
            >
              {course?.shop?.name || "Shop Name"}
            </Link>
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-semibold text-white truncate">
            {course?.name || "Product Name"}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mt-2">
            {course?.description || "No description available."}
          </p>

          {/* Start and End Date */}
          <p className="text-gray-400 text-sm mt-2">
            <strong>Start Date:</strong>{" "}
            {formattedStartDate || "No start date available."}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            <strong>End Date:</strong>{" "}
            {formattedEndDate || "No end date available."}
          </p>

          {/* Credits */}
          <p className="text-gray-400 text-sm mt-2">
            <strong>Credits:</strong>{" "}
            {course?.credits || "No credits available."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center bg-gray-800 p-2">
          <div></div>
          {/* Add to Cart Button */}
          <button className="bg-teal-500 text-white text-sm px-4 py-2 rounded shadow-md hover:bg-teal-600 transition">
            Enroll now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCard;
