import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useBookingLoadingSelector,
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
import ConfirmTolakModal from "./ConfirmTolakModal";
import ConfirmDelete from "./ConfirmDelete";
import DetailModal from "./DetailModal";
import ConfirmCancelPermohonan from "./ConfirmCancelPermohonan";
import { formatRupiah } from "../../../rpFormatter";

const ListBookings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookingData = useBookingSelector();
  const officeData = useOfficesSelector();
  const isLoading = useBookingLoadingSelector();
  const bookingType = useBookingTypeSelector();
  const [idSelected, setIdSelected] = useState(null);
  const [idDiterima, setIdDiterima] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  const path = location.pathname.split("/")[1];

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
      <table className="table relative w-full text-center">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Penanggung Jawab</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal / Jam</th>
            <th>Tempat</th>
            <th className={path === "arjuna" ? "hidden" : ""}>Lembaga</th>
            <th className={path !== "arjuna" ? "hidden" : ""}>Pembayaran</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading === true && (
          <tbody>
            <tr className=" ml-16 relative left-96  flex justify-center w-full bottom-1/2 ">
              <td className="loading  text-blue-500 loading-bars loading-lg "></td>
            </tr>
          </tbody>
        )}
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
                  <p className="text-xs font-bold">
                    {dayjs(data.startTime).format("HH:mm")} -{" "}
                    {dayjs(data.endTime).format("HH:mm")}
                  </p>
                </td>
                <td className="font-bold text-lg">
                  {officeDataArray
                    .filter((data) => data._id === id)
                    .map((data) => data.title)}
                </td>
                <td className={path === "arjuna" ? "hidden" : ""}>
                  {data.lembaga}
                </td>
                <td className={path !== "arjuna" ? "hidden" : ""}>
                  {formatRupiah(data.jenisPembayaran)}
                </td>
                <td>
                  {data.statusDiterima === false ? (
                    <div className="flex gap-3">
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
                      <button
                        onClick={() => {
                          setIdDiterima(data._id);
                          document
                            .getElementById("konfirmasi_tolak")
                            .showModal();
                        }}
                        className="btn btn-outline btn-error btn-xs"
                      >
                        Tolak
                      </button>
                    </div>
                  ) : data.statusDiterima === true ? (
                    <div>
                      <button
                        onClick={() => {
                          setIdDiterima(data._id);
                          document
                            .getElementById("konfirmasi_cancel")
                            .showModal();
                        }}
                        className="btn btn-warning btn-xs mx-2"
                      >
                        Cancel
                      </button>
                      Diterima
                    </div>
                  ) : (
                    "DITOLAK"
                  )}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        if (path === "arjuna") {
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
                      onClick={() => {
                        setIdDelete(data._id);
                        document.getElementById("konfirmasi_delete").show();
                      }}
                      className="btn btn-outline btn-error btn-xs"
                    >
                      Hapus
                    </button>

                    <button
                      onClick={() => {
                        setIdSelected(data._id);
                        document.getElementById("detailBooking").showModal();
                      }}
                      className="btn btn-outline btn-info btn-xs"
                    >
                      Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* REGION MODAL */}
      <ConfirmModal idDiterima={idDiterima} setIdDiterima={setIdDiterima} />
      <ConfirmTolakModal
        idDiterima={idDiterima}
        setIdDiterima={setIdDiterima}
      />
      <ConfirmCancelPermohonan
        idDiterima={idDiterima}
        setIdDiterima={setIdDiterima}
      />
      <DetailModal idSelected={idSelected} setIdSelected={setIdSelected} />
      <ConfirmDelete idDelete={idDelete} />
      <FormBooking bookingData={bookingDataArray} />
      <FormEditBooking idSelected={idSelected} bookingData={bookingDataArray} />
      <ArjunaEditForm idSelected={idSelected} bookingData={bookingDataArray} />
      <ArjunaFormBooking bookingData={bookingDataArray} />
      {/* END REGION MODAL */}
    </div>
  );
};

export default ListBookings;
