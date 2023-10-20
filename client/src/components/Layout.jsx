import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="  flex flex-col  min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Layout;
