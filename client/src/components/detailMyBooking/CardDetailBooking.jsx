import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { FcMoneyTransfer, FcOvertime, FcClock } from "react-icons/fc";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatRupiah } from "../../rpFormatter";
import { useMybookingSelector } from "../../config/Booked/bookingSelector";
import { retrieveMyBooking } from "../../config/Booked/bookingThunk";

const CardDetailBooking = ({ booking }) => {
  const { id } = useParams();
  return (
    <>
      {
        <div className="card relative flex md:max-h-52 flex-col mx-4 md:flex-row card-side bg-gray-100/95 shadow-sm my-2">
          <div className="card-body ">
            <h2 className="card-title">{booking.office.title}</h2>
            <div className="flex items-center  gap-2">
              <FcClock className="text-2xl" />
              <p className="flex text-sm font-semibold items-center gap-3">
                {dayjs(booking.startTime).format("HH:mm")}{" "}
                <FaLongArrowAltRight className="text-blue-800" />{" "}
                {dayjs(booking.endTime).format("HH:mm")}
              </p>
            </div>
            <div className="flex gap-2  items-center">
              <FcOvertime className="text-2xl" />
              <p className="flex text-sm font-semibold items-center gap-3">
                {dayjs(booking.dateTime).format("DD MMMM YYYY")}{" "}
              </p>
            </div>
            <div>
              <p className="text-lg font-medium">Total Pembayaran</p>
              <div className="flex  mt-2 border-t-2 md:border-none md:mt-1 gap-3 items-center">
                <FcMoneyTransfer className="text-2xl mt-1" />
                <p className="font-semibold">{formatRupiah(booking.price)}</p>
              </div>
            </div>
          </div>
          <div
            className={`flex justify-center items-center text-center px-2 ${
              booking?.statusDiterima !== true ? "hidden" : ""
            }  -rotate-6 absolute right-20 top-16 md:top-14 border-2 border-green-600/30 w-1/2 md:w-1/6 py-2 `}
          >
            <p className="text-white md:text-gray-500/50 font-bold text-xl">
              PERMOHONAN DI TERIMA
            </p>
          </div>
          <figure className="md:w-1/4 ">
            <img
              className="h-full object-cover rounded-md"
              src={`http://localhost:4000/uploads/office/${booking.office?.photos[0]}`}
              alt="Pict"
            />
          </figure>
        </div>
      }
    </>
  );
};

export default CardDetailBooking;
