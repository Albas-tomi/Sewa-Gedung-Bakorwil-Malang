import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createBooking } from "../../config/Booked/bookingThunk";
import { MdQuestionAnswer } from "react-icons/md";
import emailjs from "@emailjs/browser";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useOfficesByIDSelector } from "../../config/BookingOffice/officesSelector";

const ModalBooking = ({ booking }) => {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const officeData = useOfficesByIDSelector();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameOrder: user?.name || "",
      email: user?.email || "",
      phone: booking?.phone || "",
      totalPay: booking.price || "",
      order_id: booking.order_id || "",
    },
    onSubmit: async (values) => {
      if (booking.price === 0) {
        dispatch(createBooking(booking));
        navigate("/mybooking");
      } else {
        document.getElementById("modal_payment").close();
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post("/bayartagihan", values, config);
        setToken(response.data.token);
      }
    },
  });

  //   CEK PEMBAYARAN
  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          axios.post("/payment", result);
          dispatch(createBooking(booking));
          setToken(null);
        },
        onPending: (result) => {
          alert("Anda Belum Melakukan Pembayaran !");
          setToken(null);
        },
        onError: (error) => {
          console.log(error.message);
          setToken(null);
        },
        onClose: () => {
          alert("Lakukan pembayaran / booking office akan di batalkan !");
          setToken(null);
        },
      });
      document.getElementById("modal_payment").close();
    }
  }, [token]);

  // OPEN PAYMENT METHOD
  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client--qmka5YEZcjsd_KI";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <dialog id="modal_payment" className="modal bg-black/60 p-5 rounded-md">
      <div className="modal-box  p-6">
        <form method="dialog">
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
        <form
          className=" mt-5 flex justify-center items-center gap-4 mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <button
            type="button"
            className="btn btn-error w-28"
            onClick={() => {
              document.getElementById("modal_payment").close();
            }}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary w-28">
            Ya
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalBooking;
