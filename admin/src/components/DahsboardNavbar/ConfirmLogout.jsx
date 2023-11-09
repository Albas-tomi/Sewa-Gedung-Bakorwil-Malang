import React from "react";
const ConfirmLogout = ({ handleLogout }) => {
  return (
    <div>
      <dialog id="my_modal_confirmLogout" className="modal">
        <form method="dialog" className="modal-box">
          <div className=" flex flex-col items-center justify-center">
            {/* <img className="w-36" src={LogoConfirm} alt="LogoHapus" /> */}
            <h3 className="font-bold text-lg text-center my-4">
              Apakah Anda Yakin Ingin <br /> Logout ?{" "}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  window.my_modal_confirmLogout.close();
                }}
                className="btn bg-[#005DB9] w-[170px] text-white"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="btn w-[170px] btn-outline btn-[#005DB9]"
              >
                Iya
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ConfirmLogout;
