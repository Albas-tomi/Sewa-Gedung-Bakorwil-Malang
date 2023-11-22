import axios from "axios";
import React, { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const MobileMenu = ({ setIsActived, isActived }) => {
  return (
    <div className="z-50 ">
      <div
        onClick={() => setIsActived(false)}
        className={`${
          isActived
            ? "h-screen inset-0   bg-white transition-transform duration-300 ease-in transform rounded-xl translate-y-0"
            : "h-screen inset-0 top-0 transition-transform duration-300 ease-out transform -translate-y-full"
        } md:hidden  fixed bg-white rounded-lg`}
        tabIndex={0}
      >
        <div className=" bg-none p-3 text-3xl">
          <AiOutlineCloseCircle />
        </div>
        <div className="border-t shadow-inner">
          <div className=" flex  flex-col">
            <div className="flex mb-16 flex-col gap-2">
              <Link
                to={"/"}
                className="border-b hover:font-bold duration-200 py-2 "
              >
                <p className="text-xl ml-7 cursor-pointer">Beranda</p>
              </Link>
              <Link
                to={"/mybooking"}
                className="border-b py-2 hover:font-bold duration-200 "
              >
                <p className="text-xl ml-7 cursor-pointer">Pesanan Saya</p>
              </Link>
              <Link className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7 cursor-pointer">Tentang Kami</p>
              </Link>
              <a
                href="https://wa.me/6281615679629?text=Hallo%2C%20Saya%20Ingin%20Bertanya%20mengenai%20Penyewaan Ruangan/Gedung%20di Bakorwil 3 Malang."
                target="_blank"
                className="border-b py-2 hover:font-bold duration-200 "
              >
                <span className="text-xl ml-7 cursor-pointer">Kontak Kami</span>
              </a>
              <Link className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7 cursor-pointer">Akun </p>
              </Link>
              <Link className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7 cursor-pointer">Pusat Bantuan</p>
              </Link>
            </div>
            <div
              onClick={() =>
                document.getElementById("my_modal_alertLogout").showModal()
              }
              className="border-b py-2 hover:font-bold duration-200 "
            >
              <p className="text-xl ml-7 cursor-pointer">Keluar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
