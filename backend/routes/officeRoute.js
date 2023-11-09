import express from "express";
import {
  addOffice,
  deleteFilePhoto,
  deleteOffice,
  editOffice,
  getOffices,
  getOfficesById,
  uploadPhotos,
  uploadsWithLink,
} from "../controller/officeController.js";
import multer from "multer";
const router = express.Router();

const photosMiddleware = multer({ dest: "uploads/" });

router.get("/offices", getOffices);
router.get("/office/:id", getOfficesById);
router.post("/office", addOffice);
router.patch("/office/:id", editOffice);
router.delete("/office/:id", deleteOffice);
router.post("/upload-by-link", uploadsWithLink);
router.delete("/deleteimg/:fileName", deleteFilePhoto);
router.post("/upload-img", photosMiddleware.array("photos", 100), uploadPhotos);
export default router;
