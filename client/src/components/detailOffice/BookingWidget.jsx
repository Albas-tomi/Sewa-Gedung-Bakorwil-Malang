import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { formatRupiah } from "../../rpFormatter";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useBookingSelector } from "../../config/Booked/bookingSelector";
import "react-calendar/dist/Calendar.css";
import ModalBooking from "./ModalBooking";
import ReactCalendar from "react-calendar";
import TimesPerDay from "./bookingComponent/TimesPerDay";
import KtpUploader from "./bookingComponent/KtpUploader";
import SuratPermohonanUploader from "./bookingComponent/SuratPermohonanUploader";
import PosterUploader from "./bookingComponent/PosterUploader";
import ModalConfirm from "./ModalConfirm";

const BookingWidget = ({ office }) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const bookingData = useBookingSelector();
  const bookingDataArray = Array.isArray(bookingData) ? bookingData : [];
  const dataBooked = bookingDataArray.filter((data) => data.office === id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [photoKtp, setPhotoKtp] = useState([]);
  const [suratPermohonan, setSuratPermohonan] = useState([]);
  const [poster, setPoster] = useState([]);
  const [booking, setBooking] = useState([]);
  const [paymentOption, setPaymentOption] = useState(0);

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
      jenisPembayaran: "",
      latarBelakang: "",
      tujuanKegiatan: "",
      sasaranKegiatan: "",
      lembaga: "",
      alamatLembaga: "",
      KTPUser: "",
      catatanTambahan: "",
      suratPermohonan: "",
      posterKegiatan: "",
      dateTime: "",
      startTime: "",
      endTime: "",
      phone: "",
      email: "",
      statusDiterima: false,
      price: paymentOption,
      order_id: `order_${uuidv4()}`,
    },
    onSubmit: (values, { resetForm }) => {
      if (user) {
        values.office = id;
        values.KTPUser = photoKtp;
        values.price = paymentOption;
        values.dateTime = selectedDate;
        values.startTime = selectedStartTime;
        values.endTime = selectedEndTime;
        values.suratPermohonan = suratPermohonan;
        values.posterKegiatan = poster;
        values.jenisPembayaran = paymentOption;

        if (office.title === "Gedung Arjuna") {
          setBooking(values);
          document.getElementById("modal_payment").show();
        } else {
          document.getElementById("confirm_permohonan").show();
          setBooking(values);
        }
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setSelectedDate(new Date());
        setPhotoKtp([]);
        setPoster([]);
        setPaymentOption(null);
        setSuratPermohonan([]);
      } else {
        navigate("/login");
      }
      resetForm();
    },
  });

  return (
    <div className="bg-white mt-2  shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        {id === "65534727b0b193dc7e590891" ? (
          <span>Price : {formatRupiah(office.price)} / Kegiatan</span>
        ) : (
          <span className="my-2 ">
            Gratis Selama 4 Jam / <br /> Lebih Syarat dan Ketentuan Berlaku
          </span>
        )}
      </div>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="border  bg-white rounded-2xl">
          <div className="flex justify-around">
            {office.title === "Gedung Arjuna" ? (
              <ReactCalendar
                view="month"
                minDate={new Date()}
                onClickDay={handleGetDate}
                value={selectedDate}
                tileDisabled={({ date }) => {
                  const day = date.getDay(); // Mendapatkan hari dalam angka (0 untuk Minggu, 1 untuk Senin, dst.)
                  return day >= 1 && day <= 5; // Nonaktifkan hari Senin (1) hingga Jumat (5)
                }}
                className={"REACT-CALENDAR p-2"}
              />
            ) : (
              <ReactCalendar
                view="month"
                minDate={new Date()}
                onClickDay={handleGetDate}
                value={selectedDate}
                tileDisabled={({ date }) => {
                  const day = date.getDay(); // Mendapatkan hari dalam angka (0 untuk Minggu, 1 untuk Senin, dst.)
                  return day === 0 || day === 6; // Nonaktifkan Minggu (0) dan Sabtu (6)
                }}
                className={"REACT-CALENDAR p-3"}
              />
            )}
          </div>
        </div>
        <div className="border rounded-2xl mt-2 px-4 py-3">
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
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <div className="form-control w-full max-w-xs">
                  <input
                    name="namaKegiatan"
                    id="namaKegiatan"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.namaKegiatan}
                    type="text"
                    placeholder="Nama Kegiatan"
                    className="input input-bordered my-2 input-sm w-full "
                  />
                  {formik.errors.namaKegiatan &&
                    formik.touched.namaKegiatan && (
                      <p className="mt-1 w-full text-red-500 text-sm">
                        {formik.errors.namaKegiatan}
                      </p>
                    )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="form-control w-full max-w-xs">
                  <input
                    type="number"
                    required
                    name="jumlahPeserta"
                    id="jumlahPeserta"
                    onChange={formik.handleChange}
                    value={formik.values.jumlahPeserta}
                    min={5}
                    placeholder="Jumlah Peserta"
                    className="input my-2 input-bordered input-sm w-full "
                  />
                  {formik.errors.jumlahPeserta &&
                    formik.touched.jumlahPeserta && (
                      <p className="mt-1 w-full text-red-500 text-sm">
                        {formik.errors.jumlahPeserta}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <input
              type="text"
              required
              name="penanggungjawab"
              id="penanggungjawab"
              onChange={formik.handleChange}
              value={formik.values.penanggungjawab}
              placeholder="Nama Penanggung Jawab"
              className="input my-2 input-bordered input-sm w-full "
            />
            {formik.errors.penanggungjawab &&
              formik.touched.penanggungjawab && (
                <p className="mt-1 w-full text-red-500 text-sm">
                  {formik.errors.penanggungjawab}
                </p>
              )}
            <input
              type="tel"
              name="phone"
              required
              id="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="No Tlp."
              className="input my-2 input-bordered input-sm w-full "
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="mt-1 w-full text-red-500 text-sm">
                {formik.errors.phone}
              </p>
            )}
            <input
              type="email"
              name="email"
              required
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="No Tlp."
              className="input my-2 input-bordered input-sm w-full "
            />
            {formik.errors.email && formik.touched.email && (
              <p className="mt-1 w-full text-red-500 text-sm">
                {formik.errors.email}
              </p>
            )}
            <input
              required
              name="tujuanKegiatan"
              id="tujuanKegiatan"
              onChange={formik.handleChange}
              value={formik.values.tujuanKegiatan}
              type="text"
              placeholder="Tujuan Kegiatan"
              className="input input-bordered my-2 input-sm w-full "
            />
            {formik.errors.tujuanKegiatan && formik.touched.tujuanKegiatan && (
              <p className="mt-1 w-full text-red-500 text-sm">
                {formik.errors.tujuanKegiatan}
              </p>
            )}
            <input
              name="lembaga"
              id="lembaga"
              onChange={formik.handleChange}
              value={formik.values.lembaga}
              type="text"
              required
              placeholder="Instansi/Lembaga/Komunitas"
              className="input my-2 input-bordered input-sm w-full "
            />
            <textarea
              required
              name="alamatLembaga"
              id="alamatLembaga"
              onChange={formik.handleChange}
              value={formik.values.alamatLembaga}
              placeholder="Alamat Instansi/Lembaga/Komunitas"
              className="textarea textarea-bordered textarea-sm w-full max-w-xs"
            ></textarea>
            <textarea
              required
              name="catatanTambahan"
              id="catatanTambahan"
              onChange={formik.handleChange}
              value={formik.values.catatanTambahan}
              placeholder="Catatan tambahan"
              className="textarea textarea-bordered textarea-sm w-full max-w-xs"
            ></textarea>
            {formik.errors.catatanTambahan &&
              formik.touched.catatanTambahan && (
                <p className="mt-1 w-full text-red-500 text-sm">
                  {formik.errors.catatanTambahan}
                </p>
              )}
            {office.title === "Gedung Arjuna" && (
              <div className={office.title !== "Gedung Arjuna" ? "hidden" : ""}>
                <label className="font-bold">Pilih Jumlah Bayar :</label>
                <div className="grid grid-cols-2 mt-3 items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment_50"
                      name="paymentOption"
                      className="radio"
                      value="1750000"
                      checked={paymentOption === 1750000}
                      required
                      onChange={() => setPaymentOption(1750000)}
                    />
                    <label className="text-xs" htmlFor="payment_50">
                      50% DP Rp.1.750.000
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment_full"
                      name="paymentOption"
                      className="radio"
                      value="3500000"
                      required
                      checked={paymentOption === 3500000}
                      onChange={() => setPaymentOption(3500000)}
                    />
                    <label className="text-xs" htmlFor="payment_full">
                      Pembayaran Penuh Rp.3.500.000
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment_25"
                      name="paymentOption"
                      className="radio"
                      value="200000"
                      required
                      checked={paymentOption === 200000}
                      onChange={() => setPaymentOption(200000)}
                    />
                    <label className="text-xs" htmlFor="payment_25">
                      DP Rp.200.000
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="payment_25"
                      name="paymentOption"
                      className="radio"
                      value="0"
                      required
                      checked={paymentOption === 0}
                      onChange={() => setPaymentOption(0)}
                    />
                    <label className="text-xs" htmlFor="payment_25">
                      Pengajuan Permohonan Tanpa DP
                    </label>
                  </div>
                </div>
              </div>
            )}
            {office.title !== "Gedung Arjuna" && (
              <div>
                <textarea
                  name="latarBelakang"
                  id="latarBelakang"
                  onChange={formik.handleChange}
                  value={formik.values.latarBelakang}
                  type="text"
                  required
                  placeholder="Latar Belakang Kegiatan"
                  className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                />
                <input
                  name="sasaranKegiatan"
                  id="sasaranKegiatan"
                  onChange={formik.handleChange}
                  value={formik.values.sasaranKegiatan}
                  type="text"
                  required
                  placeholder="Sasaran/Peserta Kegiatan"
                  className="input my-2 input-bordered input-sm w-full "
                />

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
            )}
          </div>

          <button type="submit" className="btn btn-sm btn-error text-white ">
            Ajukan Permohonan
          </button>
        </div>
      </form>
      <ModalConfirm booking={booking} />
      {/* ===============GEDUNG ARJUNA============ */}
      <ModalBooking booking={booking} />
      {/* ===============GEDUNG ARJUNA============ */}
    </div>
  );
};

export default BookingWidget;
