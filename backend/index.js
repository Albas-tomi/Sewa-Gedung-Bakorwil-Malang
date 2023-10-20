import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import OfficeRoute from "./routes/officeRoute.js";
import UserRoute from "./routes/userRoute.js";
dotenv.config();
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected..."));

const app = express();
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

app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `);
});
