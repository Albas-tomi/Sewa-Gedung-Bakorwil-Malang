import React from "react";
import HeaderOffices from "../components/offices/HeaderOffices";
import ListOffices from "../components/offices/ListOffices";

const Offices = () => {
  return (
    <div className="bg-gray-100 min-h-screen shadow-sm rounded-xl p-3 mt-1">
      <HeaderOffices />
      <ListOffices />
    </div>
  );
};

export default Offices;
