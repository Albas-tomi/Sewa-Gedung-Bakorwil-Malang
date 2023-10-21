import React from "react";
import LogoutLogo from "../../assets/img/LogoutButtonConfirm.png";
const ModalAlertLogout = ({ handleLogout }) => {
  return (
    <div>
      <dialog id="my_modal_alertLogout" className="modal">
        <div className="modal-box p-6">
          <div className="flex flex-col  justify-center gap-3 items-center">
            <h3 className="font-bold text-lg ">
              Apakah Anda yakin mau keluar ?
            </h3>
            <img src={LogoutLogo} alt="logo" className="w-44" />
          </div>
          <div className="modal-action">
            <div className="flex justify-between px-3  w-full">
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
                className="btn w-32 bg-blue-800 text-white "
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
