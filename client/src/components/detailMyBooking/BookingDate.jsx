import React from "react";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";

const BookingDate = ({ data }) => {
  return (
    <div className={`flex gap-1   items-center `}>
      <div className="border-t flex gap-2  items-center border-gray-300 mt-2 py-2">
        <MdOutlineLibraryBooks />
        Hari
        <BsCalendar3 />
        {/* {format(new Date(data.checkIn), "yyyy-MM-dd")} <BiSolidArrowFromLeft />
        <BsCalendar3 />
        {format(new Date(data.checkOut), "yyyy-MM-dd")} */}
      </div>
    </div>
  );
};

export default BookingDate;
