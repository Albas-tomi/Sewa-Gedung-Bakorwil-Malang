import React, { useCallback } from "react";
import { FcQuestions } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserById } from "../../config/users/userThunk";

const ConfirmDelete = ({ idSelected }) => {
  const dispatch = useDispatch();
  const notify = () => {
    toast.warning("Berhasil Menghapus Data  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleDeleteUser = useCallback((id) => {
    dispatch(deleteUserById({ id }));
    notify();
  });
  return (
    <>
      <dialog
        id="konfirmasi_deleteUser"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className=" flex flex-col justify-center items-center  gap-6">
            <h3 className="font-bold text-lg">KONFIRMASI HAPUS USER</h3>
            <FcQuestions className="text-8xl" />
            <p className="py-4">YAKIN MENGHAPUS USER INI ?</p>
          </div>
          <div className="flex gap-16 justify-center">
            <button
              onClick={() => {
                document.getElementById("konfirmasi_deleteUser").close();
              }}
              className="btn bg-error w-28"
            >
              Batal
            </button>
            <button
              onClick={() => {
                handleDeleteUser(idSelected);
                document.getElementById("konfirmasi_deleteUser").close();
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
