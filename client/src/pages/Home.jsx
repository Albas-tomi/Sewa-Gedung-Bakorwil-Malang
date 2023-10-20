import React from "react";
import Fasilitas from "../components/home/Fasilitas";
import SecondMenuHome from "../components/home/SecondMenuHome";

const Home = () => {
  return (
    <>
      <div className="md:flex grid-flow-row grid-cols-2">
        <SecondMenuHome />
        <Fasilitas />
      </div>
    </>
  );
};

export default Home;
