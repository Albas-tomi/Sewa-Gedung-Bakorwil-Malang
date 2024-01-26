import React, { useContext, useMemo } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import ConfirmLogout from "./ConfirmLogout";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";

const NavbarDashboard = () => {
  const location = useLocation();

  const { user } = useContext(UserContext);

  const currentPage = useMemo(() => {
    const path = location.pathname.split("/")[1];
    if (path.toLowerCase().includes("beranda")) return "Beranda";
    if (path.toLowerCase().includes("arjuna")) return "Arjuna";
    if (path.toLowerCase().includes("meetingroom")) return "Meeting Room";
    if (path.toLowerCase().includes("play-hard")) return "Play Hard";
    if (path.toLowerCase().includes("command-center")) return "Command Center";
    if (path.toLowerCase().includes("co-working")) return "Co-Working Space";
    if (path.toLowerCase().includes("gedung")) return "Gedung";
    if (path.toLowerCase().includes("users")) return "Users";
    if (path.toLowerCase().includes("form-offices")) return "Form Offices";
  }, [location]);

  return (
    <div className="w-full  border-gray-400 h-24 flex items-center px-8">
      <div className="flex w-1/2">
        <h1 className="text-lg font-semibold">{currentPage}</h1>
      </div>
      <div className="flex w-1/2 justify-end  items-center  gap-4">
        <div className="flex items-center mr-11 gap-5">
          <span className="py-2 px-4 bg-blue-600 rounded-full text-white font-semibold text-2xl">
            {user.name.charAt(0)}
          </span>
          <div>
            <p className="font-semibold">{user.name}</p>
            <span>{user.email}</span>
          </div>
        </div>
        <Link
          to={"/register"}
          className={user.role === "admin" ? "" : "hidden"}
        >
          <span className="text-xs mx-4 text-blue-600 font-extrabold">
            Create New User
          </span>
        </Link>
        <button
          onClick={() => {
            window.my_modal_confirmLogout.show();
          }}
          className="border hover:bg-slate-100 duration-500 border-gray-300 rounded-full p-4"
        >
          <AiOutlineLogout className="text-2xl" />
        </button>
      </div>
      <ConfirmLogout />
    </div>
  );
};

export default NavbarDashboard;
