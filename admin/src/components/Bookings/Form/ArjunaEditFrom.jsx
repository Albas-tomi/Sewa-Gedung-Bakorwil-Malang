import React, { useCallback, useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBookingById } from "../../../config/booking/bookingThunk";
import { useBookingByIdSelector } from "../../../config/booking/bookingUseSelector";
import { parseISO } from "date-fns";
import TimesPerDay from "../TimesPerDay";

const ArjunaEditForm = ({ bookingData, idSelected }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataBooked = bookingData.filter((data) => data.office === id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const dataEditSelected = useBookingByIdSelector();
  useEffect(() => {
    if (dataEditSelected) {
      // Menggunakan parseISO untuk mengurai string tanggal
      const isoDateTime = dataEditSelected.dateTime
        ? parseISO(dataEditSelected.dateTime)
        : null;
      const isoStartTime = dataEditSelected.startTime
        ? parseISO(dataEditSelected.startTime)
        : null;
      const isoEndTime = dataEditSelected.endTime
        ? parseISO(dataEditSelected.endTime)
        : null;

      // Atur nilai-nilai state sesuai dengan data yang diubah
      setSelectedDate(isoDateTime);
      setSelectedStartTime(isoStartTime);
      setSelectedEndTime(isoEndTime);
    } else if (dataEditSelected.length === 0) {
      // Jika tidak ada data edit, atur nilai-nilai formik.values dan state menjadi kosong

      setSelectedDate(new Date());
      setSelectedStartTime(null);
      setSelectedEndTime(null);
    }
  }, [dataEditSelected]);
  const handleEditBooking = useCallback((values) => {
    dispatch(updateBookingById({ ...values, id: idSelected }));
  });

  const handleGetDate = (date) => {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      office: id,
      namaKegiatan: dataEditSelected.namaKegiatan || "",
      jumlahPeserta: dataEditSelected.jumlahPeserta || "",
      penanggungjawab: dataEditSelected.penanggungjawab || "",
      tujuanKegiatan: dataEditSelected.tujuanKegiatan || "",
      lembaga: dataEditSelected.lembaga || "",
      statusDiterima: dataEditSelected.statusDiterima || null,
      alamatLembaga: dataEditSelected.alamatLembaga || "",
      phone: dataEditSelected.phone || "",
      price: dataEditSelected.price || "",
      order_id: dataEditSelected.order_id || "",
    },
    onSubmit: async (values, { resetForm }) => {
      values.office = id;
      values.dateTime = selectedDate;
      values.startTime = selectedStartTime;
      values.endTime = selectedEndTime;
      values.statusDiterima = dataEditSelected.statusDiterima;
      handleEditBooking(values);
      document.getElementById("my_modal_formEditArjuna").close();
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      setSelectedDate(new Date());
      resetForm();
    },
  });

  return (
    <div>
      <dialog id="my_modal_formEditArjuna" className="modal bg-black/50">
        <div className="modal-box w-2/3 bg-gray-200 max-w-7xl overscroll-none">
          <h3 className="font-bold text-lg">Form Data Booking Edit</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex">
              <ReactCalendar
                view="month"
                minDate={new Date()}
                onClickDay={handleGetDate}
                value={selectedDate}
                tileDisabled={({ date }) => {
                  const day = date.getDay(); // Mendapatkan hari dalam angka (0 untuk Minggu, 1 untuk Senin, dst.)
                  return day === 0 || day === 6; // Nonaktifkan Minggu (0) dan Sabtu (6)
                }}
                className={"REACT-CALENDAR p-2"}
              />
              {/* TIMES PER DAY */}
              <TimesPerDay
                setSelectedStartTime={setSelectedStartTime}
                setSelectedEndTime={setSelectedEndTime}
                selectedStartTime={selectedStartTime}
                selectedDate={selectedDate}
                selectedEndTime={selectedEndTime}
                bookingData={dataBooked}
              />
              {/* TIMES PER DAY */}
              <div className="flex flex-col gap-3 justify-between">
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      name="namaKegiatan"
                      id="namaKegiatan"
                      onChange={formik.handleChange}
                      value={formik.values.namaKegiatan}
                      type="text"
                      placeholder="Nama Kegiatan"
                      className="input input-bordered my-2 input-sm w-full "
                    />
                    <input
                      type="number"
                      name="jumlahPeserta"
                      id="jumlahPeserta"
                      onChange={formik.handleChange}
                      value={formik.values.jumlahPeserta}
                      min={5}
                      placeholder="Jumlah Undangan"
                      className="input my-2 input-bordered input-sm w-full "
                    />
                  </div>

                  <input
                    type="text"
                    name="penanggungjawab"
                    id="penanggungjawab"
                    onChange={formik.handleChange}
                    value={formik.values.penanggungjawab}
                    placeholder="Nama Penanggung Jawab"
                    className="input my-2 input-bordered input-sm w-full "
                  />

                  <input
                    name="tujuanKegiatan"
                    id="tujuanKegiatan"
                    onChange={formik.handleChange}
                    value={formik.values.tujuanKegiatan}
                    type="text"
                    placeholder="Tujuan Kegiatan"
                    className="input input-bordered my-2 input-sm w-full "
                  />

                  <input
                    name="lembaga"
                    id="lembaga"
                    onChange={formik.handleChange}
                    value={formik.values.lembaga}
                    type="text"
                    placeholder="Instansi/Lembaga/Komunitas"
                    className="input my-2 input-bordered input-sm w-full "
                  />
                  <textarea
                    name="alamatLembaga"
                    id="alamatLembaga"
                    onChange={formik.handleChange}
                    value={formik.values.alamatLembaga}
                    placeholder="Alamat Penanggung Jawab"
                    className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-sm btn-error text-white "
                >
                  Booking Sekarang
                </button>
              </div>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  formik.setValues({
                    office: id,
                    namaKegiatan: "",
                    jumlahPeserta: "",
                    penanggungjawab: "",
                    latarBelakang: "",
                    tujuanKegiatan: "",
                    sasaranKegiatan: "",
                    lembaga: "",
                    alamatLembaga: "",
                    phone: "",
                    price: 0,
                  });
                  setSelectedEndTime(null);
                  setSelectedStartTime(null);
                  setSelectedDate(new Date());
                  setPoster([]);
                  setSuratPermohonan([]);
                }}
                className="btn btn-sm"
              >
                Tutup
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ArjunaEditForm;
