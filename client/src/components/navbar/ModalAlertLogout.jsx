import React from "react";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import Swal from "sweetalert2";
const ModalAlertLogout = ({ handleLogout }) => {
  return (
    <div>
      <dialog id="my_modal_alertLogout" className="modal">
        <div className="modal-box p-6">
          <div className="flex flex-col  justify-center gap-3 items-center">
            <h3 className="font-bold text-lg ">
              Apakah Anda yakin ingin keluar ?
            </h3>
            <FaPersonCircleQuestion className="text-8xl text-blue-600" />
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
                  let timerInterval;
                  Swal.fire({
                    title: "Tunggu Beberapa Saat!",
                    html: "Akan Selesai dalam <b></b>  detik.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading();
                      const timer = Swal.getPopup().querySelector("b");
                      timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                      }, 100);
                    },
                    willClose: () => {
                      clearInterval(timerInterval);
                    },
                  }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                      console.log("I was closed by the timer");
                    }
                  });
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
