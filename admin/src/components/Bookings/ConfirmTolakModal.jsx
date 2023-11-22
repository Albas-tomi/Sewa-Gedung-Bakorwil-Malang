import React, { useEffect } from "react";
import { FcQuestions } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  retrieveBookingById,
  updateBookingById,
} from "../../config/booking/bookingThunk";
import { retrieveUsers } from "../../config/users/userThunk.jsx";
import { useBookingByIdSelector } from "../../config/booking/bookingUseSelector";
import axios from "axios";
import { useUsersSelector } from "../../config/users/userSelector.jsx";
import { useOfficesByIdSelector } from "../../config/offices/officesSelector.jsx";
import { retrieveOfficesById } from "../../config/offices/officesThunk.jsx";

const ConfirmTolakModal = ({ idDiterima, setIdDiterima }) => {
  const dispatch = useDispatch();
  const dataBookingById = useBookingByIdSelector();
  const usersData = useUsersSelector();
  const { user } = dataBookingById;
  const officeData = useOfficesByIdSelector();
  const userDataSendMail = usersData.find((userData) => userData._id === user);

  const dataSendMail = {
    email: userDataSendMail?.email,
    name: userDataSendMail?.name,
    office: officeData.title,
  };
  useEffect(() => {
    if (idDiterima) {
      dispatch(retrieveBookingById(idDiterima));
      dispatch(retrieveUsers());
    }
    return;
  }, [idDiterima]);
  useEffect(() => {
    if (dataBookingById.office) {
      dispatch(retrieveOfficesById(dataBookingById.office));
    }
    return;
  }, [dataBookingById]);

  const handleTolakClick = async () => {
    dispatch(
      updateBookingById({
        id: idDiterima,
        ...dataBookingById,
        statusDiterima: null,
      })
    );
    await axios.post("/tolak-permohonan", dataSendMail);
  };
  return (
    <>
      <dialog
        id="konfirmasi_tolak"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className=" flex flex-col justify-center items-center  gap-6">
            <h3 className="font-bold text-lg">KONFIRMASI PERMOHONAN</h3>
            <FcQuestions className="text-8xl" />
            <p className="py-4">YAKIN MENOLAK PERMOHONAN ?</p>
          </div>
          <div className="flex gap-16 justify-center">
            <button
              onClick={() => {
                setIdDiterima(null);
                document.getElementById("konfirmasi_tolak").close();
              }}
              className="btn bg-error w-28"
            >
              Batal
            </button>
            <button
              onClick={() => {
                handleTolakClick();
                document.getElementById("konfirmasi_tolak").close();
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

export default ConfirmTolakModal;
