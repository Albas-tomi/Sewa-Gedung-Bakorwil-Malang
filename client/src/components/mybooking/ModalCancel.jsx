import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ModalCancel = ({ idSelected, myBooked }) => {
  const [dataCancel, setDataCancel] = useState({});
  const [alasan, setAlasan] = useState("");
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

Saya ingin mengajukan permohonan pembatalan untuk pesanan saya dengan rincian sebagai berikut:

Nama Penanggung Jawab: ${dataCancel.penanggungjawab}
Gedung : ${dataCancel.office.title} 
Tanggal : ${dayjs(dataCancel.dateTime).format("DD MMMM YYYY")}.
ID Pesanan: ${idSelected}
Alasan Pembatalan: ${alasan}

Saya mengharapkan bantuan dan pemrosesan terkait pembatalan permohononan penggunaan gedung.
Mohon konfirmasi jika ada informasi tambahan yang diperlukan dari saya.

Terima kasih atas perhatian dan kerjasamanya.

Salam, ${dataCancel.penanggungjawab}
`;

    // Membuka link WhatsApp di tab baru
    window.open(
      `whatsapp://send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`
    );
    setAlasan("");
    document.getElementById("modal_cancel").close();
  };

  return (
    <div>
      <dialog id="modal_cancel" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-center w-full text-lg">
            YAKIN MENGAJUKAN PEMBATALAN PERMOHONAN ?
          </h3>
          <p>Syarat Ketentuan Pembatalan</p>
          <br />
          <span className="text-red-500">
            1. Pembatalan paling lambat 4 hari sebelum kegiatan dilakukan jika
            tidak otomatis ditolak
          </span>
          <br />
          <span className="text-red-500">
            2. Konfirmasi pembatalan paling lambat 1x 24 Jam setelah pengiriman
            pembatalan
          </span>
          <br />
          <span className="text-red-500">
            3. Jika telah melakukan pembayaran maka tidak akan dikembalikan 100%
          </span>
          <label className="form-control w-full max-w-full">
            <div className="label">
              <span className="label-text">Alasan Pembatalan</span>
            </div>
            <textarea
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Bio"
            ></textarea>
            <div className="flex w-full justify-center items-center gap-4">
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
                    document.getElementById("modal_cancel").close();
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

export default ModalCancel;
