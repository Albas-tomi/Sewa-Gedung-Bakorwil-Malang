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
import Carousel from "react-multi-carousel";

const Fasilitas = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 4,
            partialVisibilityGutter: 30,
          },
        }}
        rewind
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
        className=" items-center  md:shadow-none flex md:w-1/2 "
      >
        <div className=" border-b-2   border-white duration-200   flex justify-center items-center flex-col">
          <AiFillBank className="text-4xl text-center" />
          Gedung Bersih
        </div>
        <div className=" border-b-2   border-white duration-200 flex justify-center items-center flex-col">
          <MdOutlineChair className="text-4xl text-center" />
          <p>Kursi Rapat</p>
        </div>
        <div className=" border-b-2   border-white duration-200  flex justify-center items-center flex-col">
          {" "}
          <RiSurroundSoundLine className="text-4xl text-center" />
          <p>Sound System</p>
        </div>
        <div className=" border-b-2   border-white duration-200  flex justify-center items-center flex-col">
          {" "}
          <PiToiletDuotone className="text-4xl text-center" />
          <p>Toilet Bersih</p>
        </div>
        <div className=" border-b-2   border-white duration-200  justify-center items-center flex flex-col">
          <TbAirConditioning className="text-4xl text-center" />
          <p>AC</p>
        </div>
        <div className=" border-b-2   border-white duration-200  justify-center items-center  flex flex-col">
          <FaPeopleCarry className="text-4xl text-center" />
          <p> Kebersihan</p>
        </div>
        <div className=" border-b-2   border-white duration-200  justify-center items-center  flex flex-col">
          <FaPeoplePulling className="text-4xl text-center" />
          <p> Keamanan</p>
        </div>
        <div className=" border-b-2   border-white duration-200   justify-center  items-center  flex flex-col">
          <GiPowerGenerator className="text-4xl text-center" />
          <p>Genset</p>
        </div>
      </Carousel>
    </>
  );
};

export default Fasilitas;
