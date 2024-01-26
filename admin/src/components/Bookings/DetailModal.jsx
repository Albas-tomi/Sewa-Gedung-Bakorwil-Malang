import React, { useState } from "react";
import { useBookingByIdSelector } from "../../config/booking/bookingUseSelector";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FiPrinter } from "react-icons/fi";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const DetailModal = ({ setIdSelected }) => {
  const dataDetailSelected = useBookingByIdSelector();
  const path = location.pathname.split("/")[1];

  return (
    <>
      <dialog id="detailBooking" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              onClick={() => {
                setIdSelected("");
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div>
            <table className="my-3">
              <thead>
                <tr className="">
                  <td>Nama Penanggung Jawab</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.penanggungjawab}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.email}</td>
                </tr>
                <tr>
                  <td>Nomor Telepon</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.phone}</td>
                </tr>
                <tr>
                  <td>Nama Kegiatan</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.namaKegiatan}</td>
                </tr>
                <tr>
                  <td>Tujuan Kegiatan</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.tujuanKegiatan}</td>
                </tr>

                <tr>
                  <td>Pelaksanaan Kegiatan</td>
                  <td className="px-3">:</td>
                  <td>
                    {" "}
                    {dayjs(dataDetailSelected.dateTime).format("DD-MMM-YYYY")}
                  </td>
                </tr>
                <tr>
                  <td>Jam Pelaksanaan Kegiatan</td>
                  <td className="px-3">:</td>
                  <td>
                    <strong> Pukul </strong>
                    {dayjs(dataDetailSelected.startTime).format("HH:mm")} Sampai
                    Dengan
                    <strong> Pukul </strong>
                    {dayjs(dataDetailSelected.endTime).format("HH:mm")}
                  </td>
                </tr>
                <tr>
                  <td>Catatan</td>
                  <td className="px-3">:</td>
                  <td>{dataDetailSelected.catatanTambahan}</td>
                </tr>
              </thead>
            </table>
            <tr>
              <td>Sasaran Kegiatan</td>
              <td className="px-3">:</td>
              <td>{dataDetailSelected.sasaranKegiatan}</td>
            </tr>
            <section className="flex flex-col text-center gap-3">
              <span className="font-semibold py-2">KTP Penanggung Jawab</span>
              {dataDetailSelected?.KTPUser ? (
                <img
                  className="rounded-2xl w-full h-44 object-cover"
                  src={`http://localhost:4000/uploads/ktp/${dataDetailSelected.KTPUser}`}
                  alt="gedung"
                />
              ) : null}
            </section>
          </div>
          <div
            className={` grid grid-cols-2 gap-3 ${
              path.toLowerCase().includes("arjuna") ? "hidden" : ""
            }`}
          >
            <section className="flex text-center flex-col gap-3">
              <span className="font-semibold  py-2">Poster Kegiatan</span>
              {dataDetailSelected?.posterKegiatan ? (
                <img
                  className="rounded-2xl w-full h-44 object-cover"
                  src={`http://localhost:4000/uploads/poster/${dataDetailSelected.posterKegiatan}`}
                  alt="gedung"
                />
              ) : null}
            </section>
            <div>
              <section className="flex gap-6 justify-center ">
                <span className="font-semibold ">Surat Permohonan</span>
                <a
                  className="text-blue-600 flex gap-3 justify-center items-center font-semibold"
                  href={`http://localhost:4000/uploads/surat/${dataDetailSelected.suratPermohonan}`}
                  target="_blank"
                >
                  <FiPrinter className=" text-xl" /> Cetak Surat
                </a>
              </section>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={`http://localhost:4000/uploads/surat/${dataDetailSelected.suratPermohonan}`}
                />
              </Worker>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  setIdSelected("");
                }}
                className="btn"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailModal;
