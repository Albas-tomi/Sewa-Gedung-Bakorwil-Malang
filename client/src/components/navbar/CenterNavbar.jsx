import React, { useMemo } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";

const CenterNavbar = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <div>
      {" "}
      <ul className="flex gap-6 py-4 px-8 rounded-full border shadow-sm hover:shadow-lg">
        <li
          className={`  ${
            path == "" ? "border-black" : "border-white"
          } hover:border-black border-b-2   duration-400`}
        >
          <Link to={"/"}>Home</Link>{" "}
        </li>
        <span>|</span>
        <li
          className={` ${
            path == "mybooking" ? "border-black" : "border-white"
          } hover:border-black border-b-2 duration-400  `}
        >
          <Link to={!user ? "/login" : "/mybooking"}>My Booking</Link>
        </li>
        <span>|</span>
        <li
          className={`hover:border-black border-b-2   ${
            path == "about" ? "border-black" : "border-white"
          } duration-400`}
        >
          <a href="">About</a>
        </li>
        <span>|</span>
        <li
          className={`hover:border-black border-b-2   ${
            path == "about" ? "border-black" : "border-white"
          } duration-400`}
        >
          <a href="">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default CenterNavbar;
