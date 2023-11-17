import React from "react";
import { GrNext } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { Link } from "react-router-dom";

const HeaderOffices = () => {
  return (
    <div className="flex shadow-sm bg-white p-3 rounded-lg justify-between">
      <div>
        <h1 className="font-bold text-lg">Offices Information</h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <HiOutlineBuildingOffice className="text-blue-500 text-2xl" />
        <GrNext className="text-sm" />
        <span className="text-gray-600">Offices</span>
        <Link to={"/form-offices"}>
          <HiOutlineViewGridAdd className="text-3xl duration-300 hover:text-blue-700" />
        </Link>
      </div>
    </div>
  );
};

export default HeaderOffices;
