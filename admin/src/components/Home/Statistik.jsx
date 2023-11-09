import React from "react";
import { useBookingSelector } from "../../config/booking/bookingUseSelector";

const Statistik = () => {
  const bookingData = useBookingSelector();
  return (
    <div className="grid gap-8  grid-cols-3 mt-4">
      <div className=" flex-col flex text-white bg-blue-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        Booking
        <span className="text-white text-5xl text-center">
          {bookingData.length}
        </span>
      </div>
      <div className="flex-col flex text-white bg-green-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        User
        <span className="text-white text-5xl text-center">12</span>
      </div>
      <div className="flex-col flex text-white bg-purple-500/60 h-28 rounded-xl p-2 font-bold text-xl">
        Complete Booked
        <span className="text-white text-5xl text-center">4</span>
      </div>
    </div>
  );
};

export default Statistik;
