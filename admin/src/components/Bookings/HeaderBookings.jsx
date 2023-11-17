import React from "react";
import { TbBrandBooking } from "react-icons/tb";
import { GrNext } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useParams } from "react-router-dom";

const HeaderBookings = () => {
  const { id } = useParams();
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
          onClick={() => {
            if (id === "65534727b0b193dc7e590891") {
              document.getElementById("my_modal_formInputArjuna").showModal();
            } else {
              document.getElementById("my_modal_formInput").showModal();
            }
          }}
        >
          <HiOutlineViewGridAdd className="text-3xl duration-300 hover:text-blue-700" />
        </button>
      </div>
    </div>
  );
};

export default HeaderBookings;
