import React from "react";
import Fasilitas from "../components/home/Fasilitas";
import SecondMenuHome from "../components/home/SecondMenuHome";
import ListOffices from "../components/home/ListOffices";

const Home = () => {
  return (
    <>
      <div className="md:flex grid-flow-row grid-cols-2">
        <SecondMenuHome />
        <Fasilitas />
      </div>

      <ListOffices />
    </>
  );
};

export default Home;
