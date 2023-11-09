import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import OfficeRoute from "./routes/officeRoute.js";
import UserRoute from "./routes/userRoute.js";
import BookingRoute from "./routes/bookingRoute.js";
dotenv.config();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected..."));

const app = express();

// AGAR STATIC FILE BISA DI AKSES
app.use("/uploads/", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(OfficeRoute);
app.use(UserRoute);
app.use(BookingRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});
