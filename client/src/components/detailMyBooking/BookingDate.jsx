import { differenceInCalendarDays, format } from "date-fns";
import React from "react";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";

const BookingDate = ({ data }) => {
  const dayBooked = differenceInCalendarDays(
    new Date(data.checkOut),
    new Date(data.checkIn)
  );
  const longDayBooked = dayBooked === 0 ? 1 : dayBooked + 1;
  return (
    <div className={`flex gap-1   items-center `}>
      <div className="border-t flex gap-2  items-center border-gray-300 mt-2 py-2">
        <MdOutlineLibraryBooks />
        {longDayBooked}
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
