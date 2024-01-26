import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GalleryOffice from "../components/detailOffice/GalleryOffice";
import CardDetailBooking from "../components/detailMyBooking/CardDetailBooking";

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
          <h1 className="text-3xl font-semibold">{booking.office.title}</h1>
          <a className="my-2 block font-semibold text-gray-500">
            {booking.office.extraInfo}
          </a>
          <div className="bg-gray-200 flex-col flex justify-around md:justify-start p-1  items-center  my-4 rounded-2xl ">
            <h2 className="text-2xl font-bold ">Informasi Booking</h2>
            <CardDetailBooking booking={booking} />
          </div>
          <GalleryOffice office={booking.office} />
        </div>
      )}
    </div>
  );
};

export default DetailBooking;
