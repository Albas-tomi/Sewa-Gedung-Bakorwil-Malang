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
          <Link to={"/"}> Beranda</Link>{" "}
        </li>
        <span>|</span>
        <li
          className={` ${
            path == "pesanan-saya" ? "border-black" : "border-white"
          } hover:border-black border-b-2 duration-400  `}
        >
          <Link to={!user ? "/login" : "/pesanan-saya"}>Pesanan Saya</Link>
        </li>
        <span>|</span>
        <li
          className={`hover:border-black border-b-2   ${
            path == "tentang-kami" ? "border-black" : "border-white"
          } duration-400`}
        >
          <Link to={"/tentang-kami"}>Tentang Kami</Link>
        </li>
        <span>|</span>
        <li
          className={`hover:border-black border-b-2   ${
            path == "kontak-kami" ? "border-black" : "border-white"
          } duration-400`}
        >
          <Link to={"/kontak-kami"}>Kontak</Link>
        </li>
      </ul>
    </div>
  );
};

export default CenterNavbar;
