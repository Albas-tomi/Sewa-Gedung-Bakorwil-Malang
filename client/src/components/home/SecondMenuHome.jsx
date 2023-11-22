import React from "react";
import LogoJatim from "../../assets/img/logoJ-removebg-preview.png";

const SecondMenuHome = () => {
  return (
    <div className=" justify-evenly gap-3 w-1/2 hidden md:flex items-center rounded-br-2xl">
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="checkbox" className="toggle" />
        </label>
      </div>
      <div className="flex gap-3">
        <div className="flex justify-center font-bold text-center flex-col">
          <span>Badan Koordinasi Wilayah Pemerintahan dan Pembangunan</span>
          <span>III Provinsi Jawa Timur di Malang </span>
        </div>
        <img src={LogoJatim} alt="Logo" className="md:w-20 md:mx-2 lg:w-auto" />
      </div>
    </div>
  );
};

export default SecondMenuHome;
