import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import { FcDepartment } from "react-icons/fc";
import { FaHouseChimney } from "react-icons/fa6";
import LogoSewaKawis from "../../assets/img/Sewa_Kawis-removebg-preview.png";
import { useDispatch } from "react-redux";
import { retrieveOffices } from "../../config/offices/officesThunk";
import { useOfficesSelector } from "../../config/offices/officesSelector";

const Sidebar = () => {
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();
  const offices = useOfficesSelector();

  useEffect(() => {
    dispatch(retrieveOffices());
  }, []);

  return (
    <div
      className={`relative transition-all duration-500 ${
        display ? "w-[220px]" : "w-[100px]"
      } pt-8 px-2  `}
    >
      <div
        className="absolute   shadow-lg rounded-full p-1 -right-3  top-10"
        onClick={() => setDisplay(!display)}
      >
        <GrNext className={`duration-500 ${!display && "rotate-180"} `} />
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-whiterounded-full cursor-pointer">
          <img src={LogoSewaKawis} alt="test" className="w-11" />
        </div>
      </div>

      <NavLink to={"/"}>
        {({ isActive }) => (
          <ul
            className={`${
              isActive
                ? "w-full py-2 shadow-sm mb-2  bg-blue-400/20 rounded-xl border-blue-500 text-blue-500"
                : "w-full py-4 text-slate-300"
            } cursor-pointer`}
          >
            <li
              className={`  flex mx-auto w-full  text-start ${
                !display ? "text-center pl-0 " : "pl-11"
              } justify-center items-center mr-10 `}
            >
              <FaHouseChimney className="h-[28px]  w-[28px]" />
              <span
                className={`${
                  !display && "hidden w-0"
                } text-start font-medium pl-8 w-full text-sm`}
              >
                Dashboard
              </span>
            </li>
          </ul>
        )}
      </NavLink>
      {offices.map((office) => (
        <NavLink
          to={
            office.title === "Gedung Arjuna"
              ? `/arjuna/${office._id}`
              : office.title === "Meeting Room"
              ? `/meetingroom/${office._id}`
              : office.title === "Play Hard"
              ? `/play-hard/${office._id}`
              : office.title === "Command Center"
              ? `/command-center/${office._id}`
              : office.title === "Co-Working Space"
              ? `/co-working/${office._id}`
              : ""
          }
          key={office.title}
        >
          {({ isActive }) => (
            <ul
              className={`${
                isActive
                  ? "w-full py-2 shadow-sm  mb-2  bg-blue-400/20 rounded-xl border-blue-500 text-blue-500"
                  : "w-full py-4 text-slate-300"
              } cursor-pointer`}
            >
              <li
                className={`  flex mx-auto w-full  text-start ${
                  !display ? "text-center pl-0 " : "pl-11"
                } justify-center items-center mr-10 `}
              >
                <FcDepartment className="h-[28px]  w-[28px]" />
                <span
                  className={`${
                    !display && "hidden w-0"
                  } text-start font-medium pl-6 w-full text-sm`}
                >
                  {office.title}
                </span>
              </li>
            </ul>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
