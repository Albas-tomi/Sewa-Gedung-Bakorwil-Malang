import React from "react";

const CenterNavbar = () => {
  return (
    <div>
      {" "}
      <ul className="flex gap-6 py-4 px-8 rounded-full border shadow-sm hover:shadow-lg">
        <li className="hover:border-black border-b-2  border-white duration-400  ">
          <a href="">Home</a>
        </li>
        <span>|</span>
        <li className="hover:border-black border-b-2 border-white duration-400  ">
          <a href="">My Booking</a>
        </li>
        <span>|</span>
        <li className="hover:border-black border-b-2 border-white duration-400 ">
          <a href="">About</a>
        </li>
        <span>|</span>
        <li className="hover:border-black border-b-2 border-white duration-400 ">
          <a href="">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default CenterNavbar;
