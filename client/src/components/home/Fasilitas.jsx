import React from "react";
import { AiFillBank } from "react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdOutlineChair } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { FaPeoplePulling } from "react-icons/fa6";
import { RiSurroundSoundLine } from "react-icons/ri";
import { PiToiletDuotone } from "react-icons/pi";
import { GiPowerGenerator } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";

const Fasilitas = () => {
  return (
    <>
      <div className=" items-center  md:shadow-none flex md:w-1/2 ">
        <div className="overflow-x-scroll text-gray-500 scrollbar-hide scroll-smooth py-3 rounded-xl  items-center flex gap-6">
          <span className="text-2xl">|</span>
          <div className="carousel-item  border-b-2 hover:border-black border-white duration-200   flex justify-center items-center flex-col">
            <AiFillBank className="text-4xl" />
            Gedung Bersih
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200 flex justify-center items-center flex-col">
            <MdOutlineChair className="text-4xl" />
            <p>Kursi Rapat</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200  flex justify-center items-center flex-col">
            {" "}
            <RiSurroundSoundLine className="text-4xl" />
            <p>Sound System</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200  flex justify-center items-center flex-col">
            {" "}
            <PiToiletDuotone className="text-4xl" />
            <p>Toilet Bersih</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200  justify-center items-center flex flex-col">
            <TbAirConditioning className="text-4xl" />
            <p>AC</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200  justify-center items-center  flex flex-col">
            <FaPeopleCarry className="text-4xl" />
            <p>Petugas Kebersihan</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200  justify-center items-center  flex flex-col">
            <FaPeoplePulling className="text-4xl" />
            <p>Petugas Keamanan</p>
          </div>
          <div className="carousel-item border-b-2 hover:border-black border-white duration-200   justify-center  items-center  flex flex-col">
            <GiPowerGenerator className="text-4xl" />
            <p>Genset</p>
          </div>
          <span className="text-2xl">|</span>
        </div>
      </div>
    </>
  );
};

export default Fasilitas;
