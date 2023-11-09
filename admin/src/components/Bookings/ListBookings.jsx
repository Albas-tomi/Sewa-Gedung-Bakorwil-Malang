import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useBookingSelector,
  useBookingTypeSelector,
} from "../../config/booking/bookingUseSelector";
import { useOfficesSelector } from "../../config/offices/officesSelector";
import { formatRupiah } from "../../../rpFormatter";
import { retrieveOffices } from "../../config/offices/officesThunk";
import {
  createdBooking,
  deleteBookingById,
  retrieveBooking,
  retrieveBookingById,
  updateBookingById,
} from "../../config/booking/bookingThunk";
import FormBooking from "./FormBooking";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import FormEditBooking from "./FormEditBooking";

const ListBookings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingData = useBookingSelector();
  const officeData = useOfficesSelector();
  const bookingType = useBookingTypeSelector();
  const [idSelected, setIdSelected] = useState(null);
  const [dataSelected, setDataSelected] = useState({});

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
            <th>Lembaga</th>
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
                <td>{data.lembaga}</td>
                <td>Terima/Tolak</td>
                <td className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIdSelected(data._id);
                      document.getElementById("my_modal_formEditInput").show();
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
                  <button className="btn btn-outline btn-ghost btn-xs">
                    Terima
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <FormBooking idSelected={idSelected} bookingData={bookingDataArray} />
      <FormEditBooking idSelected={idSelected} bookingData={bookingDataArray} />
    </div>
  );
};

export default ListBookings;
