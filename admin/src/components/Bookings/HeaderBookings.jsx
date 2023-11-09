import React from "react";
import { TbBrandBooking } from "react-icons/tb";
import { GrNext } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const HeaderBookings = () => {
  return (
    <div className="flex shadow-sm bg-white p-3 rounded-lg justify-between">
      <div>
        <h1 className="font-bold text-lg">Bookings</h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <TbBrandBooking className="text-blue-500 text-2xl" />
        <GrNext className="text-sm" />
        <span className="text-gray-600">Bookings</span>
        <button
          onClick={() =>
            document.getElementById("my_modal_formInput").showModal()
          }
        >
          <HiOutlineViewGridAdd className="text-3xl duration-300 hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default HeaderBookings;
