import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import TimesPerDay from "../detailOffice/bookingComponent/TimesPerDay";
import { useBookingSelector } from "../../config/Booked/bookingSelector";

const ModalUbahTanggal = ({ idSelected, myBooked }) => {
  const bookingData = useBookingSelector();
  const bookingDataArray = Array.isArray(bookingData) ? bookingData : [];
  const dataBooked = bookingDataArray.filter(
    (data) => data.office === idSelected
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [dataCancel, setDataCancel] = useState({});
  // Hitung selisih hari antara tanggal booking dan tanggal hari ini
  const tanggalBooking = dayjs(dataCancel.dateTime);
  const selisihHari = tanggalBooking.diff(dayjs(), "day");
  useEffect(() => {
    let result = "";
    if (idSelected) {
      result = myBooked.bookingData.find((data) => data._id === idSelected);
      setDataCancel(result);
    }
  }, [idSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ganti dengan nomor WhatsApp tujuan Anda
    const nomorWhatsApp = "6283849359663";

    // Membuat pesan
    const pesan = `
    Halo Tim Customer Service Sewa Kawis Bakorwil 3 Malang,

Saya ingin mengajukan permohonan perubahan jadwal untuk pesanan saya dengan rincian sebagai berikut:
    
    Nama Penanggung Jawab: ${dataCancel.penanggungjawab}
    Gedung: ${dataCancel.office.title} 
    Tanggal: ${dayjs(dataCancel.dateTime).format("DD MMMM YYYY")}
    Jam: ${dayjs(dataCancel.startTime).format("HH:mm")} -> ${dayjs(
      dataCancel.endTime
    ).format("HH:mm")}
    ID Pesanan: ${idSelected}
    
    Tanggal Perubahan: ${dayjs(selectedDate).format("DD MMMM YYYY")}
    Jam Perubahan: ${dayjs(selectedStartTime).format("HH:mm")} -> ${dayjs(
      selectedEndTime
    ).format("HH:mm")}
    
Saya mengharapkan bantuan dan pemrosesan terkait perubahan jadwal penggunaan gedung. Mohon konfirmasi jika ada informasi tambahan yang diperlukan dari saya.
    
    Terima kasih atas perhatian dan kerjasamanya.
    
    Salam, ${dataCancel.penanggungjawab}    
`;

    // Membuka link WhatsApp di tab baru
    window.open(
      `whatsapp://send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`
    );
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    document.getElementById("modal_reschedule").close();
  };
  const handleGetDate = (date) => {
    setSelectedDate(date);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
  };
  return (
    <div>
      <dialog id="modal_reschedule" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-center w-full text-lg">
            YAKIN MENGAJUKAN PERUBAHAN JADWAL ?
          </h3>
          <p>Syarat Ketentuan Perubahan</p>
          <br />
          <span className="text-red-500">
            1. Perubahan paling lambat 4 hari sebelum kegiatan dilakukan jika
            tidak otomatis ditolak
          </span>
          <br />
          <span className="text-red-500">
            2. Konfirmasi paling lambat 1x 24 Jam setelah pengiriman perubahan
          </span>
          <br />

          <label className="form-control my-3 w-full max-w-full">
            <div className=" grid grid-cols-1 md:grid-cols-2 justify-center items-center">
              <div className="flex justify-around">
                {dataCancel.office &&
                dataCancel.office.title?.toLowerCase().includes("arjuna") ? (
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
            </div>
            <div className="flex w-full mt-3 justify-center items-center gap-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className={`${
                  selisihHari <= 4 ? "btn-disabled" : ""
                } btn btn-outline btn-accent`}
              >
                Kirim
              </button>
              <form method="dialog">
                <button
                  onClick={() => {
                    document.getElementById("modal_reschedule").close();
                  }}
                  className="btn btn-error text-white"
                >
                  Batal
                </button>
              </form>
            </div>
          </label>
        </div>
      </dialog>
    </div>
  );
};

export default ModalUbahTanggal;
