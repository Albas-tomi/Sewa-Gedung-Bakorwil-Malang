import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createdBooking } from "../../../config/booking/bookingThunk";
import TimesPerDay from "../TimesPerDay";
import KtpUploader from "../KtpUploader";
import SuratPermohonanUploader from "../SuratPermohonanUploader";
import PosterUploader from "../PosterUploader";
import { toast } from "react-toastify";

const FormBooking = ({ bookingData }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dataBooked = bookingData.filter((data) => data.office === id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [photoKtp, setPhotoKtp] = useState([]);
  const [suratPermohonan, setSuratPermohonan] = useState([]);
  const [poster, setPoster] = useState([]);
  const notify = () => {
    toast.success("Berhasil Menambahkan Data  !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleGetDate = (date) => {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };
  const formik = useFormik({
    initialValues: {
      office: id,
      namaKegiatan: "",
      jumlahPeserta: "",
      penanggungjawab: "",
      latarBelakang: "",
      tujuanKegiatan: "",
      sasaranKegiatan: "",
      lembaga: "",
      alamatLembaga: "",
      KTPUser: "",
      suratPermohonan: "",
      posterKegiatan: "",
      dateTime: "",
      startTime: "",
      endTime: "",
      phone: "",
      price: 0,
      statusDiterima: true,
      order_id: `order_${uuidv4()}`,
    },
    onSubmit: async (values, { resetForm }) => {
      values.office = id;
      values.KTPUser = photoKtp;
      values.dateTime = selectedDate;
      values.startTime = selectedStartTime;
      values.endTime = selectedEndTime;
      values.suratPermohonan = suratPermohonan;
      values.posterKegiatan = poster;
      dispatch(createdBooking(values));
      document.getElementById("my_modal_formInput").close();
      notify();
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      setSelectedDate(new Date());
      setPhotoKtp([]);
      setPoster([]);
      setSuratPermohonan([]);
      resetForm();
    },
  });

  return (
    <div>
      <dialog id="my_modal_formInput" className="modal bg-black/50">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Form Data Booking</h3>
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
                      placeholder="Jumlah Peserta"
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
                    name="latarBelakang"
                    id="latarBelakang"
                    onChange={formik.handleChange}
                    value={formik.values.latarBelakang}
                    type="text"
                    placeholder="Latar Belakang Kegiatan"
                    className="input input-bordered my-2 input-sm w-full "
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
                    name="sasaranKegiatan"
                    id="sasaranKegiatan"
                    onChange={formik.handleChange}
                    value={formik.values.sasaranKegiatan}
                    type="text"
                    placeholder="Sasaran/Peserta Kegiatan"
                    className="input my-2 input-bordered input-sm w-full "
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
                    placeholder="Alamat Instansi/Lembaga/Komunitas"
                    className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                  ></textarea>
                  {/* KTP UPLOADER */}
                  <KtpUploader
                    formik={formik}
                    setPhotoKtp={setPhotoKtp}
                    photoKtp={photoKtp}
                  />
                  {/* KTP UPLOADER */}
                  {/* SURAT PERMOHONAN UPLOADER */}
                  <SuratPermohonanUploader
                    suratPermohonan={suratPermohonan}
                    setSuratPermohonan={setSuratPermohonan}
                    formik={formik}
                  />
                  {/* SURAT PERMOHONAN UPLOADER */}

                  {/* POSTER UPLOADER */}
                  <PosterUploader
                    poster={poster}
                    setPoster={setPoster}
                    formik={formik}
                  />
                  {/* POSTER UPLOADER */}
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
              <button className="btn btn-sm">Tutup</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FormBooking;
