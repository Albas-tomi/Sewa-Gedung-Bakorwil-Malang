import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../rpFormatter";
import BookingDate from "../components/detailMyBooking/BookingDate";
import GalleryOffice from "../components/detailOffice/GalleryOffice";
import dayjs from "dayjs";

const DetailBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/mybooking").then((response) => {
        const findMyBooking = response.data.bookingData.find(
          ({ _id }) => _id === id
        );
        if (findMyBooking) {
          setBooking(findMyBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div>
      {booking.length > 0 ? (
        <div>DATA KOSONG</div>
      ) : (
        <div className="m-3 ">
          <h1 className="text-3xl">{booking.office.title}</h1>
          <a className="my-2 block font-semibold underline">
            {booking.office.address}
          </a>
          <div className="bg-gray-200 relative flex justify-around md:justify-start  items-center p-6 my-6 rounded-2xl ">
            <div>
              <h2 className="text-xl mb-2">Informasi Booking</h2>
              <div className="flex flex-col justify-start">
                <BookingDate data={booking} />
                <div className="grid grid-cols-2  ">
                  <p className="border-r pr-5 border-gray-500  my-1">
                    Total Bayar{" "}
                  </p>
                  <p className="ml-2 md:ml-14">
                    <strong>{formatRupiah(booking.price)}</strong>
                  </p>
                  <div className=" flex justify-center items-center text-center  -rotate-6 absolute right-20 top-14 border-2 border-green-600 w-1/4 py-4 ">
                    <p className="text-gray-500 font-bold text-xl">LUNAS</p>
                  </div>
                </div>
                <div className="grid grid-cols-2  ">
                  <p className="border-r pr-5 border-gray-500  my-1">
                    Metode Pembayaran{" "}
                  </p>
                </div>
                <div className="grid grid-cols-2  ">
                  <p className="border-r pr-5 border-gray-500  my-1">
                    Tanggal Pembayaran
                  </p>
                </div>
              </div>
            </div>
          </div>
          <GalleryOffice office={booking.office} />
        </div>
      )}
    </div>
  );
};

export default DetailBooking;
