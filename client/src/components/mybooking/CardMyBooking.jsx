import React, { useEffect, useState } from "react";
import { useMybookingSelector } from "../../config/Booked/bookingSelector";
import { useDispatch } from "react-redux";
import { retrieveMyBooking } from "../../config/Booked/bookingThunk";
import { formatRupiah } from "../../rpFormatter";
import dayjs from "dayjs";
import { CiClock2, CiCalendarDate } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";

import CardGalleryMyBooking from "./CardGalleryMyBooking";
import ModalCancel from "./ModalCancel";
import ModalUbahTanggal from "./ModalUbahTanggal";

const CardMyBooking = () => {
  const [idSelected, setIdSelected] = useState(null);
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
            className="card flex flex-col sm:grid  sm:grid-cols-3 relative pt-2 mx-4 md:flex-row card-side border-b-2 border-gray-400 shadow-sm md:my-1 my-4"
          >
            <Link
              to={`/pesanan-saya/${data._id}`}
              className="absolute cursor-pointer -z-10 left-3 top-2"
            >
              <CgDetailsMore />
            </Link>
            <div className="absolute z-10 md:right-[5%] right-3  top-0">
              {data.statusDiterima === true ? (
                <button className="btn btn-sm btn-success md:text-base text-white text-[8px]">
                  Diterima
                </button>
              ) : (
                <button className="btn btn-sm btn-warning md:text-base text-white text-[8px]">
                  Menunggu konfirmasi
                </button>
              )}
            </div>
            <div>
              <Link
                className="card-body  grid grid-cols-2 md:flex justify-center items-center "
                to={`/pesanan-saya/${data._id}`}
              >
                <figure className="flex  justify-center items-end ">
                  <img
                    className=" w-11/12 sm:w-full  sm:h-[100%] h-[75%] rounded-md object-cover "
                    src={`http://localhost:4000/uploads/office/${data.office?.photos[0]}`}
                    alt="Pict"
                  />
                </figure>

                <div className="flex items-center md:hidden flex-col  gap-2">
                  <h2 className="card-title md:text-2xl text-lg font-semibold">
                    {data.office.title}
                  </h2>
                  <div>
                    <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                      <CiClock2 className="text-xl " />
                    </p>

                    <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                      <CiCalendarDate className="text-xl" />
                      {dayjs(data.dateTime).format("DD MMMM YYYY")}{" "}
                    </p>

                    <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                      <MdOutlinePayment className="text-xl mt-1" />
                      {formatRupiah(data.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className=" sm:flex-col flex justify-center gap-4 p-3">
              <div className="md:flex items-center hidden flex-col  gap-2">
                <h2 className="card-title md:text-2xl text-lg font-semibold">
                  {data.office.title}
                </h2>
                <div>
                  <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                    <CiClock2 className="text-xl " />
                    {dayjs(data.startTime).format("HH:mm")}{" "}
                    <IoIosArrowRoundForward className="" />{" "}
                    {dayjs(data.endTime).format("HH:mm")}
                  </p>

                  <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                    <CiCalendarDate className="text-xl" />
                    {dayjs(data.dateTime).format("DD MMMM YYYY")}{" "}
                  </p>

                  <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                    <MdOutlinePayment className="text-xl mt-1" />
                    {formatRupiah(data.price)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIdSelected(data._id);
                  document.getElementById("modal_reschedule").showModal();
                }}
                className="btn  btn-sm btn-active btn-primary"
              >
                Ubah Jadwal
              </button>
              <button
                onClick={() => {
                  setIdSelected(data._id);

                  document.getElementById("modal_cancel").showModal();
                }}
                className="btn  btn-sm btn-outline btn-error"
              >
                Pembatalan
              </button>
            </div>
            <div className="p-8 hidden md:block ">
              <CardGalleryMyBooking office={data.office} />
            </div>
            <ModalCancel idSelected={idSelected} myBooked={myBooked} />
            <ModalUbahTanggal idSelected={idSelected} myBooked={myBooked} />
          </div>
        ))
      ) : (
        <div className=" w-full py-10 text-center">
          <span className="font-extrabold text-base md:text-2xl">
            Belum ada permohonan yang di ajukan.
          </span>
        </div>
      )}
    </>
  );
};

export default CardMyBooking;
