"use client";
import { useEffect } from "react";

const ShopPage = () => {
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.scrollHeight
      ) {
        // setProductLimit((prev) => prev + 10);
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
      {/* Profile Banner */}
      <div className="relative bg-blue-600 h-40">
        <div className="absolute bottom-3 left-4 flex items-center space-x-4 w-full">
          {/* Profile Picture */}
          <img
            className="w-28 h-28 rounded-full border-4 border-white"
            src={"https://i.ibb.co.com/z89cgQr/profile.webp"}
            alt="Shop logo"
          />
          <div className="text-white w-full">
            <h2 className="text-2xl font-bold">name </h2>
            <h2 className="text-sm">title</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm"> Followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* shop products */}
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 grid-cols-2 py-10 gap-4">
        course card
      </div>
    </div>
  );
};

export default ShopPage;
