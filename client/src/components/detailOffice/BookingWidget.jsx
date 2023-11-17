import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Await, useNavigate, useParams } from "react-router-dom";
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
import { createBooking } from "../../config/Booked/bookingThunk";
import emailjs from "@emailjs/browser";

const BookingWidget = ({ office }) => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const sendEmail = (values) => {
    emailjs
      .sendForm(
        "service_s3n1ppe", // Replace with your service ID
        "template_hwtabpm", // Replace with your template ID
        values,
        "XeSkKCtKDKKBnm10x" // Replace with your user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
        }
      );
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
      suratPermohonan: "",
      posterKegiatan: "",
      dateTime: "",
      startTime: "",
      endTime: "",
      phone: "",
      statusDiterima: false,
      price: paymentOption,
      order_id: `order_${uuidv4()}`,
    },
    onSubmit: async (values, { resetForm }) => {
      if (user) {
        values.office = id;
        values.KTPUser = photoKtp;
        values.price = paymentOption;
        values.dateTime = selectedDate;
        values.startTime = selectedStartTime;
        values.endTime = selectedEndTime;
        values.suratPermohonan = suratPermohonan;
        values.posterKegiatan = poster;
        if (paymentOption === 3500000) {
          values.jenisPembayaran = "Lunas";
        } else if (paymentOption === 1750000) {
          values.jenisPembayaran = "DP 50%";
        } else {
          values.jenisPembayaran = "DP";
        }
        if (id === "65534727b0b193dc7e590891") {
          setBooking(values);
          document.getElementById("modal_payment").show();
        } else {
          dispatch(createBooking(values));
          await sendEmail(values);
          navigate("/mybooking");
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
            {id === "65534727b0b193dc7e590891" ? (
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
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="No Tlp."
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
            <div className={id !== "65534727b0b193dc7e590891" ? "hidden" : ""}>
              <label className="font-bold">Pilih Jumlah Bayar :</label>
              <div className="flex justify-center mt-3 items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="payment_50"
                    name="paymentOption"
                    className="radio"
                    value="1750000"
                    checked={paymentOption === 1750000}
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
                    checked={paymentOption === 200000}
                    onChange={() => setPaymentOption(200000)}
                  />
                  <label className="text-xs" htmlFor="payment_25">
                    DP Rp.200.000
                  </label>
                </div>
              </div>
            </div>

            <div className={id === "65534727b0b193dc7e590891" ? "hidden" : ""}>
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
          </div>

          <button type="submit" className="btn btn-sm btn-error text-white ">
            Ajukan Permohonan
          </button>
        </div>
      </form>
      <ModalBooking booking={booking} />
    </div>
  );
};

export default BookingWidget;
