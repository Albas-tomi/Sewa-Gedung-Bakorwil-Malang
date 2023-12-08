import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  office: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    require: false,
    // TO GET ALL DATA OFFICE
    ref: "Office",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  namaKegiatan: { type: String, require: false },
  jumlahPeserta: { type: Number, require: false },
  penanggungjawab: { type: String, require: false },
  latarBelakang: { type: String, require: false },
  tujuanKegiatan: { type: String, require: false },
  sasaranKegiatan: { type: String, require: false },
  email: { type: String, require: false },
  jenisPembayaran: { type: Number, require: false },
  lembaga: { type: String, require: false },
  alamatLembaga: { type: String, require: false },
  catatanTambahan: { type: String, require: false },
  KTPUser: [String],
  statusDiterima: { type: Boolean },
  suratPermohonan: [String],
  posterKegiatan: [String],
  dateTime: { type: Date, require: false },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  phone: { type: String },
  price: Number,
  order_id: { type: String, require: false },
});

export default mongoose.model("Booking", BookingSchema);
