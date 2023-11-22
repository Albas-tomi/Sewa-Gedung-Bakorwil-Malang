import React from "react";
import CardMyBooking from "../components/mybooking/CardMyBooking";
import { useMybookingLoadingSelector } from "../config/Booked/bookingSelector";

const MyBooking = () => {
  const isLoading = useMybookingLoadingSelector();
  return (
    <div className="min-h-screen flex flex-col gap-5">
      {isLoading === true && (
        <div className="w-full absolute z-50 flex justify-center bg-white h-screen">
          <span className="loading loading-bars text-blue-400  w-1/12"></span>
        </div>
      )}
      <CardMyBooking />
    </div>
  );
};

export default MyBooking;
