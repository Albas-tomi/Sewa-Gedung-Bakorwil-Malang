import React from "react";
import dayjs from "dayjs";
import { formatRupiah } from "../../rpFormatter";
import { Link } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import CardGalleryMyBooking from "../mybooking/CardGalleryMyBooking";
import { RxActivityLog } from "react-icons/rx";
import ModalCancel from "../mybooking/ModalCancel";
import ModalUbahTanggal from "../mybooking/ModalUbahTanggal";
import { useMybookingSelector } from "../../config/Booked/bookingSelector";

const CardDetailBooking = ({ booking }) => {
  const myBooked = useMybookingSelector();

  if (!booking)
    return (
      <div className="w-full fixed overflow-hidden z-50 flex  justify-center bg-white h-screen">
        <span className="loading loading-bars text-blue-400  w-1/12"></span>
      </div>
    );

  return (
    <>
      {
        <div className="card flex flex-col sm:grid  sm:grid-cols-3 relative pt-2 mx-4 md:flex-row card-side border-b-2 border-gray-400 shadow-sm md:my-1 my-4">
          <Link
            to={`/pesanan-saya/${booking._id}`}
            className="absolute cursor-pointer -z-10 left-3 top-2"
          >
            <CgDetailsMore />
          </Link>
          <div className="absolute z-10 md:right-[5%] right-3  top-0">
            {booking.statusDiterima === true ? (
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
              to={`/pesanan-saya/${booking._id}`}
            >
              <figure className="flex  justify-center items-end ">
                <img
                  className=" w-11/12 sm:w-full  sm:h-[100%] h-[75%] rounded-md object-cover "
                  src={`http://localhost:4000/uploads/office/${booking.office?.photos[0]}`}
                  alt="Pict"
                />
              </figure>

              {/* ========================= MOBILE =========================== */}
              <div className="flex items-center md:hidden flex-col  gap-2">
                <h2 className="card-title md:text-2xl  text-lg font-semibold">
                  {booking.office.title}
                </h2>
                <div>
                  <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                    <MdDriveFileRenameOutline className="text-xl " />
                    {booking.namaKegiatan}
                  </p>
                  <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                    <RxActivityLog className="text-xl " />
                    {booking.penanggungjawab}
                  </p>

                  <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                    <CiClock2 className="text-xl " />
                    {dayjs(booking.startTime).format("HH:mm")}{" "}
                    <IoIosArrowRoundForward className="" />{" "}
                    {dayjs(booking.endTime).format("HH:mm")}
                  </p>

                  <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                    <CiCalendarDate className="text-xl" />
                    {dayjs(booking.dateTime).format("DD MMMM YYYY")}{" "}
                  </p>

                  <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                    <MdOutlinePayment className="text-xl mt-1" />
                    {formatRupiah(booking.price)}
                  </p>
                </div>
              </div>
              {/* ========================= MOBILE =========================== */}
            </Link>
          </div>
          <div className=" sm:flex-col flex justify-center gap-4 p-3">
            <div className="md:flex items-center hidden flex-col  gap-2">
              <h2 className="card-title md:text-2xl text-lg font-semibold">
                {booking.office.title}
              </h2>
              <div>
                <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                  <MdDriveFileRenameOutline className="text-xl " />
                  {booking.namaKegiatan}
                </p>
                <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                  <RxActivityLog className="text-xl " />
                  {booking.penanggungjawab}
                </p>

                <p className="flex text-xs md:text-base  font-semibold items-center gap-2 text-gray-400">
                  <CiClock2 className="text-xl " />
                  {dayjs(booking.startTime).format("HH:mm")}{" "}
                  <IoIosArrowRoundForward className="" />{" "}
                  {dayjs(booking.endTime).format("HH:mm")}
                </p>

                <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                  <CiCalendarDate className="text-xl" />
                  {dayjs(booking.dateTime).format("DD MMMM YYYY")}{" "}
                </p>

                <p className="flex text-xs md:text-base font-semibold items-center gap-2 text-gray-400">
                  <MdOutlinePayment className="text-xl mt-1" />
                  {formatRupiah(booking.price)}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                document.getElementById("modal_reschedule").showModal();
              }}
              className="btn  btn-sm btn-active btn-primary"
            >
              Ubah Jadwal
            </button>
            <button
              onClick={() => {
                document.getElementById("modal_cancel").showModal();
              }}
              className="btn  btn-sm btn-outline btn-error"
            >
              Pembatalan
            </button>
          </div>
          <div className="p-8 hidden md:block ">
            <CardGalleryMyBooking office={booking.office} />
          </div>
          <ModalCancel idSelected={booking._id} myBooked={myBooked} />
          <ModalUbahTanggal idSelected={booking._id} myBooked={myBooked} />
        </div>
      }
    </>
  );
};

export default CardDetailBooking;
