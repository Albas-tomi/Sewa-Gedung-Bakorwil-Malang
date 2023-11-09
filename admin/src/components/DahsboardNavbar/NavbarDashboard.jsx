import React, { useMemo } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import ConfirmLogout from "./ConfirmLogout";
import { useLocation } from "react-router-dom";

const NavbarDashboard = () => {
  const location = useLocation();

  const currentPage = useMemo(() => {
    const path = location.pathname.split("/")[1];
    if (path === "") return "Dashboard";
    if (path === "arjuna") return "Arjuna";
    if (path === "meetingroom") return "Meeting Room";
    if (path === "play-hard") return "Play Hard";
    if (path === "command-center") return "Command Center";
    if (path === "co-working") return "Co-Working Space";
  }, [location]);

  return (
    <div className="w-full  border-gray-400 h-24 flex items-center px-8">
      <div className="flex w-1/2">
        <h1 className="text-lg font-semibold">{currentPage}</h1>
      </div>
      <div className="flex w-1/2 justify-end  items-center  gap-4">
        <div className="flex items-center mr-11 gap-5">
          <span className="py-2 px-4 bg-blue-600 rounded-full text-white font-semibold text-2xl">
            P
          </span>
          <div>
            <p className="font-semibold">Putri Ayu</p>
            <span>PutriAYu@gmail.com</span>
          </div>
        </div>
        <button
          // onClick={() => {
          //   window.my_modal_confirmLogout.show();
          // }}
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
