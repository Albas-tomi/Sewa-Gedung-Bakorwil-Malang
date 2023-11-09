import express from "express";
import {
  bayarTagihan,
  deleteBooking,
  deletePhotoKtp,
  deletePoster,
  deleteSuratPermohonan,
  editBooking,
  getBookings,
  getDataBookingById,
  getDataMyBookings,
  getPayment,
  makeBookingOffice,
  makePayment,
  uploadKtpUser,
  uploadPoster,
  uploadSuratPermohonan,
} from "../controller/bookingController.js";

import multer from "multer";
import path from "path";

const router = express.Router();
// Konfigurasi multer untuk upload ke "uploads/ktp"
const ktpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/ktp"); // Tentukan direktori tujuan untuk file KTP
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});
// Konfigurasi multer untuk upload ke "uploads/surat"
const suratStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/surat"); // Tentukan direktori tujuan untuk file KTP
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});
// Konfigurasi multer untuk upload ke "uploads/poster"
const posterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/poster"); // Tentukan direktori tujuan untuk file KTP
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});

const ktpUpload = multer({ storage: ktpStorage });
const suratUpload = multer({ storage: suratStorage });
const posterUpload = multer({ storage: posterStorage });

router.post("/uploadKtp", ktpUpload.array("photo", 1), uploadKtpUser),
  router.post("/uploadposter", posterUpload.array("photo", 1), uploadPoster),
  router.post(
    "/uploadsuratpermohonan",
    suratUpload.array("file", 1),
    uploadSuratPermohonan
  ),
  router.delete("/deleteKtp/:fileName", deletePhotoKtp);
router.delete("/deletebooking/:id", deleteBooking);
router.delete("/deleteposter/:fileName", deletePoster);
router.delete("/deletesuratpermohonan/:fileName", deleteSuratPermohonan);
router.put("/editbooking/:id", editBooking);
router.post("/booked", makeBookingOffice);
router.get("/mybooking", getDataMyBookings);
router.get("/bookings", getBookings);
router.get("/bookingById/:id", getDataBookingById);
router.post("/bayartagihan", bayarTagihan);
router.post("/payment", makePayment);
router.get("/payment", getPayment);

export default router;
