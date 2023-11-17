import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useBookingSelector,
  useBookingTypeSelector,
} from "../../config/booking/bookingUseSelector";
import { useOfficesSelector } from "../../config/offices/officesSelector";
import { retrieveOffices } from "../../config/offices/officesThunk";
import {
  createdBooking,
  deleteBookingById,
  retrieveBooking,
  retrieveBookingById,
  updateBookingById,
} from "../../config/booking/bookingThunk";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import FormBooking from "./Form/FormBooking";
import FormEditBooking from "./Form/FormEditBooking";
import ArjunaFormBooking from "./Form/ArjunaFormBooking";
import ArjunaEditForm from "./Form/ArjunaEditFrom";
import ConfirmModal from "./ConfirmModal";

const ListBookings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingData = useBookingSelector();
  const officeData = useOfficesSelector();
  const bookingType = useBookingTypeSelector();
  const [idSelected, setIdSelected] = useState(null);
  const [idDiterima, setIdDiterima] = useState(null);

  const handleDeleteBooking = useCallback((id) => {
    dispatch(deleteBookingById({ id }));
  });

  // CEK APAKAH DATANYA BERUPA  ARRAY
  const bookingDataArray = Array.isArray(bookingData) ? bookingData : [];
  const officeDataArray = Array.isArray(officeData) ? officeData : [];

  useEffect(() => {
    dispatch(retrieveBooking());
    dispatch(retrieveOffices());
  }, []);

  useEffect(() => {
    if (idSelected) {
      dispatch(retrieveBookingById(idSelected));
    }
    return;
  }, [idSelected]);

  useEffect(() => {
    if (bookingType === createdBooking.fulfilled.type) {
      dispatch(retrieveBooking());
      dispatch(retrieveOffices());
    }
    if (bookingType === deleteBookingById.fulfilled.type) {
      dispatch(retrieveBooking());
      dispatch(retrieveOffices());
    }
    if (bookingType === updateBookingById.fulfilled.type) {
      dispatch(retrieveBooking());
      dispatch(retrieveOffices());
    }
    return;
  }, [bookingType]);

  return (
    <div className="overflow-x-auto w-full bg-white shadow-sm mt-6 rounded-xl p-3">
      <table className="table w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Penanggung Jawab</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal / Jam</th>
            <th>Tempat</th>
            <th className={id === "65534727b0b193dc7e590891" ? "hidden" : ""}>
              Lembaga
            </th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingDataArray
            .filter((data) => data.office === id)
            .map((data, idx) => (
              <tr key={data._id}>
                <td>{(idx += 1)}</td>
                <td>{data.penanggungjawab}</td>
                <td>{data.namaKegiatan}</td>
                <td className="">
                  {dayjs(data.dateTime).format("DD-MMM-YYYY")}
                  <br />
                  <span className="text-xs font-bold">
                    {dayjs(data.startTime).format("HH:mm")} -{" "}
                    {dayjs(data.endTime).format("HH:mm")}
                  </span>
                </td>
                <td className="font-bold text-lg">
                  {officeDataArray
                    .filter((data) => data._id === id)
                    .map((data) => data.title)}
                </td>
                <td
                  className={id === "65534727b0b193dc7e590891" ? "hidden" : ""}
                >
                  {data.lembaga}
                </td>
                <td>
                  {data.statusDiterima === false ? (
                    <button
                      onClick={() => {
                        setIdDiterima(data._id);
                        document
                          .getElementById("konfirmasi_terima")
                          .showModal();
                      }}
                      className="btn btn-outline btn-ghost btn-xs"
                    >
                      Terima
                    </button>
                  ) : (
                    "DITERIMA"
                  )}
                </td>
                <td className="flex mt-2 items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      if (id === "65534727b0b193dc7e590891") {
                        document
                          .getElementById("my_modal_formEditArjuna")
                          .showModal();
                        setIdSelected(data._id);
                      } else {
                        document
                          .getElementById("my_modal_formEditInput")
                          .showModal();
                        setIdSelected(data._id);
                      }
                    }}
                    className="btn btn-outline btn-warning btn-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(data._id)}
                    className="btn btn-outline btn-error btn-xs"
                  >
                    Hapus
                  </button>

                  <button className="btn btn-outline btn-info btn-xs">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* REGION MODAL */}
      <ConfirmModal idDiterima={idDiterima} setIdDiterima={setIdDiterima} />
      <FormBooking bookingData={bookingDataArray} />
      <FormEditBooking idSelected={idSelected} bookingData={bookingDataArray} />
      <ArjunaEditForm idSelected={idSelected} bookingData={bookingDataArray} />
      <ArjunaFormBooking bookingData={bookingDataArray} />
      {/* END REGION MODAL */}
    </div>
  );
};

export default ListBookings;
