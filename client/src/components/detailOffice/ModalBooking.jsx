import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createBooking } from "../../config/Booked/bookingThunk";
import { formatRupiah } from "../../rpFormatter";
const ModalBooking = ({ booking }) => {
  const { user } = useContext(UserContext);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nameOrder: user?.name || "",
      email: user?.email || "",
      totalPay: booking.price || "",
      order_id: booking.order_id || "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/bayartagihan", values, config);
      setToken(response.data.token);
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
    <dialog id="modal_payment" className="modal p-5 rounded-md">
      <div className="modal-box  p-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost bg-none hover:bg-gray-200 rounded-full p-2 absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h1 className="font-bold my-3 text-lg ">
          ISI DATA SESUAI UNTUK KONFIRMASI PEMBAYARAN!
        </h1>
        <form className=" mt-5 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="nameOrder">Nama </label>
          <input
            id="nameOrder"
            name="nameOrder"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nameOrder}
          />
          <label htmlFor="totalPay">Total Bayar</label>
          <input
            readOnly
            id="totalPay"
            name="totalPay"
            type="text"
            onChange={formik.handleChange}
            value={formatRupiah(formik.values.totalPay)}
          />
          <label htmlFor="order_id">Order Id</label>
          <input
            id="order_id"
            readOnly
            name="order_id"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.order_id}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <button
            type="submit"
            className="btn bg-blue-500 text-white px-7 rounded-2xl"
          >
            Bayar
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalBooking;
