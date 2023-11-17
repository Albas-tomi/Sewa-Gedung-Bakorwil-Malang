import React from "react";
import Fasilitas from "../components/home/Fasilitas";
import SecondMenuHome from "../components/home/SecondMenuHome";
import ListOffices from "../components/home/ListOffices";
import Carrousel from "../components/Header/Carousel";

const Home = () => {
  return (
    <>
      <Carrousel />
      <div className="md:flex grid-flow-row grid-cols-2">
        <SecondMenuHome />
        <Fasilitas />
      </div>
      <ListOffices />
    </>
  );
};

export default Home;
