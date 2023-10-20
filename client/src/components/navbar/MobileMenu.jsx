import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const MobileMenu = ({ setIsActived, isActived }) => {
  return (
    <div>
      <div
        onClick={() => setIsActived(false)}
        className={`${
          isActived
            ? "h-screen inset-0 top-2 bg-white transition-transform duration-300 ease-in transform rounded-xl translate-y-0"
            : "h-screen inset-0 top-0 transition-transform duration-300 ease-out transform -translate-y-full"
        } md:hidden absolute bg-white rounded-lg`}
        tabIndex={0}
      >
        <div className=" bg-none p-3 text-3xl">
          <AiOutlineCloseCircle />
        </div>
        <div className="border-t shadow-inner">
          <div className=" flex  flex-col">
            <div className="flex mb-16 flex-col gap-2">
              <div className="border-b hover:font-bold duration-200 py-2 ">
                <p className="text-xl ml-7">Beranda</p>
              </div>
              <div className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7">Pesanan Saya</p>
              </div>
              <div className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7">Tentang Kami</p>
              </div>
              <div className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7">Kontak Kami</p>
              </div>
              <div className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7">Akun</p>
              </div>
              <div className="border-b py-2 hover:font-bold duration-200 ">
                <p className="text-xl ml-7">Pusat Bantuan</p>
              </div>
            </div>
            <div className="border-b py-2 hover:font-bold duration-200 ">
              <p className="text-xl ml-7">Keluar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
