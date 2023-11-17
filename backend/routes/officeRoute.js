import express from "express";
import {
  addOffice,
  deleteOffice,
  deletePhotoOffice,
  editOffice,
  getOffices,
  getOfficesById,
  uploadOfficePhotos,
} from "../controller/officeController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Konfigurasi multer untuk upload ke "uploads/ktp"
const officeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/office"); // Tentukan direktori tujuan untuk file KTP
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});
const officeUpload = multer({ storage: officeStorage });

router.post(
  "/upload-office",
  officeUpload.array("photo", 100),
  uploadOfficePhotos
);
router.delete("/delete-office/:fileName", deletePhotoOffice);
router.get("/offices", getOffices);
router.get("/office/:id", getOfficesById);
router.post("/office", addOffice);
router.patch("/office/:id", editOffice);
router.delete("/office/:id", deleteOffice);
export default router;
