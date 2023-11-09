import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDashboard from "../DahsboardNavbar/NavbarDashboard";

const NavigationLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex grow flex-col">
        <NavbarDashboard />
        <Outlet />
      </div>
    </div>
  );
};

export default NavigationLayout;
