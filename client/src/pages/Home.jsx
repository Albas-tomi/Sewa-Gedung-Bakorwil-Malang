import React from "react";
import Fasilitas from "../components/home/Fasilitas";
import SecondMenuHome from "../components/home/SecondMenuHome";
import ListOffices from "../components/home/ListOffices";
import Carrousel from "../components/Header/CarouselHeader";
import { useOfficesLoadingSelector } from "../config/BookingOffice/officesSelector";

const Home = () => {
  const isLoading = useOfficesLoadingSelector();
  return (
    <>
      {isLoading === true && (
        <div className="w-full fixed overflow-hidden z-50 flex  justify-center bg-white h-screen">
          <span className="loading loading-bars text-blue-400  w-1/12"></span>
        </div>
      )}
      <Carrousel />
      <div className="md:flex relative grid-flow-row grid-cols-2">
        <SecondMenuHome />
        <Fasilitas />
      </div>

      <ListOffices />
    </>
  );
};

export default Home;
