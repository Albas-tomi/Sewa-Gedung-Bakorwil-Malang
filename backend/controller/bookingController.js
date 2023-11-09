import Booking from "../models/booking.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import midtransClient from "midtrans-client";
import User from "../models/user.js"; // Import your User model
import Payment from "../models/payment.js";
import path from "path";

const jwtSecret = "{];l%%$45%^7686gwhdvdhbewrjnefjnrktgjkrntglk+_P}{/";

const getDataUserFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      resolve(userData);
    });
  });
};

// ====== UPLOAD KTP USER ==========

export const uploadKtpUser = (req, res) => {
  // UPLOAD FILE MEMORY
  const uploadedFilesKTP = [];
  for (let index = 0; index < req.files.length; index++) {
    const { filename } = req.files[index];
    uploadedFilesKTP.push(filename);
  }
  res.json(uploadedFilesKTP);
};
// ====== DELETE ==========

export const deletePhotoKtp = (req, res) => {
  // MENDAPATKAN DATA FILE
  const fileName = req.params.fileName;
  const filePath = path.join("uploads/ktp", fileName);
  console.log(filePath);
  // Menghapus file dari sistem file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file: ", err);
      return res.status(500).json({ message: "Failed to delete file" });
    }
    console.log(`File '${fileName}' deleted successfully.`);
    res.status(200).json({ message: "File deleted successfully" });
  });
};
// ====== DELETE ==========
// ====== UPLOAD KTP USER ==========

// ====== UPLOAD SURAT PERMOHONAN USER ==========
export const uploadSuratPermohonan = (req, res) => {
  // UPLOAD FILE MEMORY
  const uploadedFilesSurat = [];
  for (let index = 0; index < req.files.length; index++) {
    const { filename } = req.files[index];
    uploadedFilesSurat.push(filename);
  }
  res.json(uploadedFilesSurat);
};

// ====== DELETE ==========
export const deleteSuratPermohonan = (req, res) => {
  // MENDAPATKAN DATA FILE
  const fileName = req.params.fileName;
  const filePath = path.join("uploads/surat", fileName);
  console.log(filePath);
  // Menghapus file dari sistem file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file: ", err);
      return res.status(500).json({ message: "Failed to delete file" });
    }
    console.log(`File '${fileName}' deleted successfully.`);
    res.status(200).json({ message: "File deleted successfully" });
  });
};
// ====== DELETE ==========
// ====== UPLOAD SURAT PERMOHONAN USER ==========

// ====== UPLOAD SURAT PERMOHONAN USER ==========
export const uploadPoster = (req, res) => {
  // UPLOAD FILE MEMORY
  const uploadedPoster = [];
  for (let index = 0; index < req.files.length; index++) {
    const { filename } = req.files[index];
    uploadedPoster.push(filename);
  }
  res.json(uploadedPoster);
};

// ====== DELETE ==========
export const deletePoster = (req, res) => {
  // MENDAPATKAN DATA FILE
  const fileName = req.params.fileName;
  const filePath = path.join("uploads/poster", fileName);
  console.log(filePath);
  // Menghapus file dari sistem file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file: ", err);
      return res.status(500).json({ message: "Failed to delete file" });
    }
    console.log(`File '${fileName}' deleted successfully.`);
    res.status(200).json({ message: "File deleted successfully" });
  });
};
// ====== DELETE ==========
// ====== UPLOAD SURAT PERMOHONAN USER ==========

export const makeBookingOffice = async (req, res) => {
  // const userData = await getDataUserFromReq(req);
  const {
    office,
    namaKegiatan,
    jumlahPeserta,
    penanggungjawab,
    tujuanKegiatan,
    latarBelakang,
    sasaranKegiatan,
    lembaga,
    alamatLembaga,
    KTPUser,
    suratPermohonan,
    posterKegiatan,
    dateTime,
    startTime,
    endTime,
    phone,
    price,
    order_id,
  } = req.body;

  try {
    Booking.create({
      office,
      namaKegiatan,
      jumlahPeserta,

      penanggungjawab,
      tujuanKegiatan,
      latarBelakang,
      sasaranKegiatan,
      lembaga,
      alamatLembaga,
      KTPUser,
      suratPermohonan,
      posterKegiatan,
      dateTime,
      startTime,
      endTime,
      phone,
      price,
      order_id,
    })
      .then((bookingDoc) => {
        res.json(bookingDoc);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.json(error.message);
  }
};

export const getDataMyBookings = async (req, res) => {
  const userData = await getDataUserFromReq(req);
  const userNameBooked = userData.name;
  const bookingData = await Booking.find({ user: userData.id }).populate(
    "office"
  );

  const response = {
    userName: userNameBooked,
    bookingData: bookingData,
  };
  res.status(200).json(response);
};

export const getDataBookingById = async (req, res) => {
  try {
    const bookingData = await Booking.findOne({ _id: req.params.id });
    if (!bookingData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(bookingData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editBooking = async (req, res) => {
  const id = req.params.id; // Assuming 'id' is specified in the route params

  const {
    office,
    namaKegiatan,
    jumlahPeserta,
    penanggungjawab,
    tujuanKegiatan,
    latarBelakang,
    sasaranKegiatan,
    lembaga,
    alamatLembaga,
    KTPUser,
    suratPermohonan,
    posterKegiatan,
    dateTime,
    startTime,
    endTime,
    phone,
    price,
    order_id,
  } = req.body;

  try {
    const bookingDoc = await Booking.findById(id);
    if (!bookingDoc) {
      return res.status(404).json({ message: "Booking not found" });
    }

    bookingDoc.set({
      office,
      namaKegiatan,
      jumlahPeserta,
      penanggungjawab,
      tujuanKegiatan,
      latarBelakang,
      sasaranKegiatan,
      lembaga,
      alamatLembaga,
      KTPUser,
      suratPermohonan,
      posterKegiatan,
      dateTime,
      startTime,
      endTime,
      phone,
      price,
      order_id,
    });

    await bookingDoc.save();
    return res.json({ message: "Booking updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// MIDTRANS PAYMENT ============
export const bayarTagihan = async (req, res) => {
  const userData = await getDataUserFromReq(req);
  try {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });
    const parameter = {
      transaction_details: {
        nameOrdered: req.body.nameOrder,
        email: req.body.email,
        order_id: req.body.order_id,
        gross_amount: req.body.totalPay,
      },
      customer_details: {
        nameOrdered: req.body.name,
        email: req.body.email,
      },
    };
    snap.createTransaction(parameter).then((transaction) => {
      let transactionToken = transaction.token;
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      res.status(200).json({
        message: "berhasil membuat transaksi",
        dataPayment,
        userData,
        token: transactionToken,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makePayment = async (req, res) => {
  const {
    bca_va_number,
    fraud_status,
    order_id,
    payment_type,
    status_message,
    payment_id,
    transaction_status,
    transaction_time,
    gross_amount,
    va_numbers,
  } = req.body;

  try {
    const paymentData = {
      bca_va_number,
      fraud_status,
      order_id,
      payment_type,
      status_message,
      payment_id,
      transaction_status,
      transaction_time,
      gross_amount,
      va_numbers,
    };

    const dataPayment = await Payment.create(paymentData);

    res.json(dataPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPayment = async (req, res) => {
  res.json(await Payment.find());
};
