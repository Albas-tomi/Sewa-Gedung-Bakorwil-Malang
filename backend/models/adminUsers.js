import mongoose from "mongoose";

const AdminUser = new mongoose.Schema({
  name: String,
  role: { type: String, default: "user" },
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("AdminUser", AdminUser);
