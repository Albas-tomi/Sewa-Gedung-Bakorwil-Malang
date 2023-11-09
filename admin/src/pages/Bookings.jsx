import React from "react";
import HeaderBookings from "../components/Bookings/HeaderBookings";
import ListBookings from "../components/Bookings/ListBookings";

const Bookings = () => {
  return (
    <div className="bg-gray-100 min-h-screen shadow-sm rounded-xl p-3 mt-1">
      <HeaderBookings />
      <ListBookings />
    </div>
  );
};

export default Bookings;
