import React, { useCallback } from "react";
import { FcQuestions } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { deleteBookingById } from "../../config/booking/bookingThunk";
import { toast } from "react-toastify";

const ConfirmDelete = ({ idDelete }) => {
  const dispatch = useDispatch();
  const notify = () => {
    toast.warning("Berhasil Menghapus Data  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleDeleteBooking = useCallback((id) => {
    dispatch(deleteBookingById({ id }));
    notify();
  });
  return (
    <>
      <dialog
        id="konfirmasi_delete"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className=" flex flex-col justify-center items-center  gap-6">
            <h3 className="font-bold text-lg">
              KONFIRMASI PENERIMAAN PERMOHONAN
            </h3>
            <FcQuestions className="text-8xl" />
            <p className="py-4">YAKIN MENERIMA PERMOHONAN ?</p>
          </div>
          <div className="flex gap-16 justify-center">
            <button
              onClick={() => {
                document.getElementById("konfirmasi_delete").close();
              }}
              className="btn bg-error w-28"
            >
              Batal
            </button>
            <button
              onClick={() => {
                handleDeleteBooking(idDelete);
                document.getElementById("konfirmasi_delete").close();
              }}
              className="btn bg-info w-28"
            >
              Ya
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmDelete;
