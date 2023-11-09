import React from "react";
import { FaHome } from "react-icons/fa";
import { GrNext } from "react-icons/gr";

const HeaderHome = () => {
  return (
    <div className="flex shadow-sm bg-white p-3 rounded-lg justify-between">
      <div>
        <h1 className="font-bold text-lg">Booking Information</h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <FaHome className="text-blue-500 text-2xl" />
        <GrNext className="text-sm" />
        <span className="text-gray-600">Dashboard</span>
      </div>
    </div>
  );
};

export default HeaderHome;
