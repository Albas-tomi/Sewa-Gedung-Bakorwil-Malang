import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdQuestionAnswer } from "react-icons/md";
import { createBooking } from "../../config/Booked/bookingThunk";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import dayjs from "dayjs";
import { retrieveOfficeById } from "../../config/BookingOffice/officesThunk";
import { useOfficesByIDSelector } from "../../config/BookingOffice/officesSelector";

const ModalConfirm = ({ booking }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const officeData = useOfficesByIDSelector();

  const sendEmail = async () => {
    try {
      // Fetch officeData
      await dispatch(retrieveOfficeById(id));

      // Check if officeData is available and has the 'title' property
      const namaGedung = officeData && officeData.title ? officeData.title : "";

      // Create a form element
      const form = document.createElement("form");

      // Add input fields for each property in the data
      const inputData = {
        penanggungjawab: booking.penanggungjawab,
        gedung: namaGedung,
        namaKegiatan: booking.namaKegiatan,
        dateTime: dayjs(booking.dateTime).format("DD MMMM YYYY"),
      };

      Object.keys(inputData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = inputData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);

      // Use sendForm with the dynamically created form
      await emailjs.sendForm(
        "service_s3n1ppe",
        "template_hwtabpm",
        form,
        "XeSkKCtKDKKBnm10x"
      );

      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleCreatePermohonan = () => {
    dispatch(createBooking(booking));
    sendEmail();
    navigate("/mybooking");
  };

  return (
    <dialog
      id="confirm_permohonan"
      className="modal bg-black/60 p-5 rounded-md"
    >
      <div className="modal-box  p-6">
        <form onSubmit={(e) => e.preventDefault()} method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost bg-none hover:bg-gray-200 rounded-full p-2 absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold my-3 gap-4 text-lg ">
            Apakah Yakin Data Sudah Terisi Dengan Benar ?
          </h1>
          <MdQuestionAnswer className="text-6xl" />
          <span className="text-gray-500">
            Jika Sudah Klik Lanjutkan Untuk Mengirim Permohonan
          </span>
        </div>
        <form className=" mt-5 flex justify-center items-center gap-4 mx-auto">
          <button
            className="btn btn-error w-28"
            onClick={() =>
              document.getElementById("confirm_permohonan").close()
            }
          >
            Batal
          </button>
          <button
            onClick={() => handleCreatePermohonan()}
            type="button"
            className="btn btn-primary w-28"
          >
            Ya
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalConfirm;
