import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import GalleryOffice from "./GalleryOffice";
import { useDispatch } from "react-redux";
import { retrieveOfficeById } from "../../config/BookingOffice/officesThunk";
import { useOfficesByIDSelector } from "../../config/BookingOffice/officesSelector";
import { retrieveBooking } from "../../config/Booked/bookingThunk";

const ListDetailOffice = () => {
  const { id } = useParams();
  const office = useOfficesByIDSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(retrieveBooking());
      dispatch(retrieveOfficeById(id));
    }
  }, [id]);

  if (!office) return "";
  return (
    <div className="mt-4 md:mx-3 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{office.title}</h1>
      <a className="my-2 block font-semibold underline">{office.address}</a>
      <div className="relative">
        <GalleryOffice office={office} />
        <div className="grid mt-8 gap-8 grid-cols-1">
          <div>
            <div>
              <h2 className="font-semibold text-2xl my-2">Description</h2>
              {office.description}
            </div>
            <div className="my-2">
              <h2 className="text-xl font-semibold">Informasi</h2>
              <div>
                <section className="flex gap-4">
                  <strong>Buka</strong> :
                  <span className="font-semibold text-gray-500">
                    {office.buka}
                  </span>
                </section>
                <section className="flex gap-4">
                  <strong>Tutup </strong> :
                  <span className="font-semibold text-gray-500">
                    {office.tutup}
                  </span>
                </section>
                <section className="flex gap-4">
                  <strong>Maksimal Kapasitas Pengunjung </strong> :
                  <span className="font-semibold text-gray-500">
                    {office.maxGuest} Orang
                  </span>
                </section>
                <section className="flex gap-4">
                  <strong>Fasilitas </strong> :{" "}
                  <span className="font-semibold text-gray-500">
                    {office.fasilitas}
                  </span>
                </section>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 grid-cols-1">
            <div>
              <h2 className="text-xl font-semibold">Informasi Kegunaan</h2>
              <p className="text-base   text-gray-500 font-semibold">
                {office.extraInfo}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Informasi Pengajuan Penyewaan/Permohonan
              </h2>
              <p className="text-base   text-red-600"> {office.catatan}</p>
            </div>
          </div>
          <div>
            <BookingWidget office={office} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetailOffice;
