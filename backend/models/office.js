import mongoose from "mongoose";

const Office = new mongoose.Schema({
  // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: [String],
  description: String,
  extraInfo: String,
  catatan: String,
  fasilitas: String,
  buka: { type: String, required: false },
  tutup: { type: String, required: false },
  maxGuest: Number,
  price: Number,
});

export default mongoose.model("Office", Office);
