import React, { useEffect } from "react";
import { useMybookingSelector } from "../../config/Booked/bookingSelector";
import { useDispatch } from "react-redux";
import { retrieveMyBooking } from "../../config/Booked/bookingThunk";
import { formatRupiah } from "../../rpFormatter";
import dayjs from "dayjs";
import { BiArrowFromLeft } from "react-icons/bi";
import { FcMoneyTransfer, FcOvertime } from "react-icons/fc";
import { Link } from "react-router-dom";

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
            className="card relative flex max-h-52 flex-col mx-4 md:flex-row card-side bg-gray-100/95 shadow-sm my-2"
          >
            <div className=" flex justify-center items-center text-center  -rotate-6 absolute right-20 top-14 border-2 border-green-600 w-1/6 py-2 ">
              <p className="text-gray-500 font-bold text-xl">LUNAS</p>
            </div>
            <figure className="md:w-1/4 ">
              <img
                className="h-full object-cover rounded-md"
                src="https://cdn0-production-images-kly.akamaized.net/aVAkhlayJSc8gpfxzPCWAnIW7II=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
                alt="Pict"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.office.title}</h2>
              <p className="text-lg font-medium">CheckIN - CheckOut</p>
              <div className="flex gap-2  items-center">
                <FcOvertime className="text-2xl" />
                <span>{dayjs(data.checkIn).format("DD MMMM YYYY")} </span>
                <BiArrowFromLeft className="text-xl " />
                <span>{dayjs(data.checkOut).format("DD MMMM YYYY")} </span>
              </div>
              <p className="text-lg font-medium">Total Pembayaran</p>
              <div className="flex  mt-4 border-t-2 md:border-none md:mt-0 gap-3 items-center">
                <FcMoneyTransfer className="text-2xl mt-1" />
                <p>{formatRupiah(data.price)}</p>
              </div>
              <Link
                to={`/mybooking/${data._id}`}
                className="absolute right-10 bottom-4 justify-end"
              >
                <button className="btn bg-blue-600 text-white">Detail</button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>Data Kosong</div>
      )}
    </>
  );
};

export default CardMyBooking;
