import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: String,
  role: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("User", User);
