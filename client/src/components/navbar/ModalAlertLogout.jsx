import React from "react";
import { IoLogOut } from "react-icons/io5";
const ModalAlertLogout = ({ handleLogout }) => {
  return (
    <div>
      <dialog id="my_modal_alertLogout" className="modal">
        <div className="modal-box p-6">
          <div className="flex flex-col  justify-center gap-3 items-center">
            <h3 className="font-bold text-lg ">
              Apakah Anda yakin ingin keluar ?
            </h3>
            <IoLogOut className="text-9xl text-blue-600" />
          </div>
          <div className="modal-action">
            <div className="flex justify-center gap-3 px-3  w-full">
              <button
                onClick={() =>
                  document.getElementById("my_modal_alertLogout").close()
                }
                className="btn w-32 "
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  alert("berhasil keluar");
                  document.getElementById("my_modal_alertLogout").close();
                }}
                className="btn w-32 bg-blue-600 text-white "
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalAlertLogout;
