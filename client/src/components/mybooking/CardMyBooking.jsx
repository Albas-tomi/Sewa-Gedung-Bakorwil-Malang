import React, { useEffect } from "react";
import { useMybookingSelector } from "../../config/Booked/bookingSelector";
import { useDispatch } from "react-redux";
import { retrieveMyBooking } from "../../config/Booked/bookingThunk";
import { formatRupiah } from "../../rpFormatter";
import dayjs from "dayjs";
import { FcMoneyTransfer, FcOvertime, FcClock } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const CardMyBooking = () => {
  const myBooked = useMybookingSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveMyBooking());
  }, []);
  return (
    <>
      {myBooked.bookingData?.length > 0 ? (
        myBooked.bookingData?.map((data) => (
          <div
            key={data._id}
            className="card relative flex max-h-52 flex-col mx-4 md:flex-row card-side bg-gray-100/95 shadow-sm md:my-1 my-4"
          >
            <div
              className={`flex justify-center items-center text-center px-2 ${
                data.statusDiterima !== true ? "hidden" : ""
              }  -rotate-6 absolute right-20 top-16 md:top-14 border-2 border-green-600/30 w-1/2 md:w-1/6 py-2 `}
            >
              <p className="text-white md:text-gray-500/50 font-bold text-xl">
                PERMOHONAN DI TERIMA
              </p>
            </div>
            <figure className="md:w-1/4 ">
              <img
                className="h-full object-cover rounded-md"
                src={`http://localhost:4000/uploads/office/${data.office?.photos[0]}`}
                alt="Pict"
              />
            </figure>
            <div className="card-body hidden md:block">
              <h2 className="card-title">{data.office.title}</h2>
              <div className="flex items-center  gap-2">
                <FcClock className="text-2xl" />
                <p className="flex text-sm font-semibold items-center gap-3">
                  {dayjs(data.startTime).format("HH:mm")}{" "}
                  <FaLongArrowAltRight className="text-blue-800" />{" "}
                  {dayjs(data.endTime).format("HH:mm")}
                </p>
              </div>
              <div className="flex gap-2  items-center">
                <FcOvertime className="text-2xl" />
                <p className="flex text-sm font-semibold items-center gap-3">
                  {dayjs(data.dateTime).format("DD MMMM YYYY")}{" "}
                </p>
              </div>
              <div>
                <p className="text-lg font-medium">Total Pembayaran</p>
                <div className="flex  mt-2 border-t-2 md:border-none md:mt-1 gap-3 items-center">
                  <FcMoneyTransfer className="text-2xl mt-1" />
                  <p className="font-semibold">{formatRupiah(data.price)}</p>
                </div>
              </div>
            </div>
            <Link
              to={`/mybooking/${data._id}`}
              className={`absolute right-10 bottom-0 md:bottom-4 justify-end  `}
            >
              <button className="btn bg-blue-600 text-white">Detail</button>
            </Link>
          </div>
        ))
      ) : (
        <div>Data Kosong</div>
      )}
    </>
  );
};

export default CardMyBooking;
