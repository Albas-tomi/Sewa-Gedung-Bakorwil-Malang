import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  office: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    require: true,
    // TO GET ALL DATA OFFICE
    ref: "Office",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  namaKegiatan: { type: String, require: true },
  jumlahPeserta: { type: Number, require: true },
  penanggungjawab: { type: String, require: true },
  latarBelakang: { type: String, require: true },
  tujuanKegiatan: { type: String, require: true },
  sasaranKegiatan: { type: String, require: true },
  lembaga: { type: String, require: true },
  alamatLembaga: { type: String, require: true },
  KTPUser: [String],
  suratPermohonan: [String],
  posterKegiatan: [String],
  dateTime: { type: Date, require: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  phone: { type: String },
  price: Number,
  order_id: { type: String, require: true },
});

export default mongoose.model("Booking", BookingSchema);
