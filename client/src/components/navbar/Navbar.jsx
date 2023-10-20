import React, { useState, useContext } from "react";
import LogoSewaKawis from "../../assets/img/Sewa_Kawis-removebg-preview.png";
import { BiSliderAlt, BiUserCircle } from "react-icons/bi";
import MobileMenu from "./MobileMenu";
import CenterNavbar from "./CenterNavbar";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isActived, setIsActived] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  return (
    <>
      <div className="navbar px-4 bg-base-100">
        <div className="navbar-start ">
          <img src={LogoSewaKawis} alt="logo" className="w-12 m-2" />
        </div>
        <div className="navbar-center hidden md:flex">
          <CenterNavbar />
        </div>
        <div className="navbar-end ">
          <div className="dropdown hidden md:block">
            <label
              onClick={() => !user && navigate("/login")}
              tabIndex={user && 0}
              className="flex justify-center items-center gap-2 border rounded-full  px-3 py-2 hover:shadow-md duration-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>

              {user ? (
                <span className="py-1 px-2 rounded-full bg-black text-xs text-white">
                  {user?.name[0]}
                </span>
              ) : (
                <span className="rounded-full p-2  bg-black text-white">
                  <BiUserCircle className="text-xl" />
                </span>
              )}
            </label>
            <ul
              tabIndex={0}
              className="menu hidden md:block menu-sm dropdown-content mt-3 z-[1] p-2 absolute right-5   shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Akun</a>
              </li>
              <li>
                <a>Pusat Bantuan</a>
              </li>
              <li>
                <a>Keluar</a>
              </li>
            </ul>
          </div>
          <div
            className="border md:hidden p-2 rounded-full shadow-md"
            onClick={() => {
              !user ? navigate("/login") : setIsActived(true);
            }}
          >
            <BiSliderAlt className="text-3xl " />
          </div>
        </div>
      </div>
      <MobileMenu setIsActived={setIsActived} isActived={isActived} />
      <hr className="hidden md:block" />
    </>
  );
};

export default Navbar;
