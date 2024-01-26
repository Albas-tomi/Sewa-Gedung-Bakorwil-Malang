import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./Header/CarouselHeader";

const Layout = () => {
  return (
    <div className="flex flex-col  min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
