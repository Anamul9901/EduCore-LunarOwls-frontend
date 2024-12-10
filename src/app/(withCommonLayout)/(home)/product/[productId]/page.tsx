"use client";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { useParams } from "next/navigation";

const SingleProductPage = () => {
  const { user } = useAppSelector(selectCurrentUser);

  return (
    <div className="w-full min-h-[94vh] flex justify-center items-center">
      single product page
    </div>
  );
};

export default SingleProductPage;
