import express from "express";
import {
  addOffice,
  deleteOffice,
  editOffice,
  getOffices,
  getOfficesById,
} from "../controller/officeController.js";
const router = express.Router();

router.get("/offices", getOffices);
router.get("/office/:id", getOfficesById);
router.post("/office", addOffice);
router.patch("/office/:id", editOffice);
router.delete("/office/:id", deleteOffice);
export default router;
