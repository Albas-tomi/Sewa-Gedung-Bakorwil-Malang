import React from "react";
import HeaderHome from "../components/Home/HeaderHome";
import Statistik from "../components/Home/Statistik";
import ListBooking from "../components/Home/ListBooking";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen shadow-sm rounded-xl p-3 mt-1">
      <HeaderHome />
      <Statistik />
      <ListBooking />
    </div>
  );
};

export default Home;
