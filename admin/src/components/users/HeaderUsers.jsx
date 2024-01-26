import React from "react";
import { FaUsers } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const HeaderUsers = () => {
  return (
    <div className="flex shadow-sm bg-white p-3 rounded-lg justify-between">
      <div>
        <h1 className="font-bold text-lg">Users Information</h1>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <FaUsers className="text-blue-500 text-2xl" />
        <GrNext className="text-sm" />
        <span className="text-gray-600">Users</span>
        <button disabled>
          <HiOutlineViewGridAdd className="text-3xl duration-300 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default HeaderUsers;
