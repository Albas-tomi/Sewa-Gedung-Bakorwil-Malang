import express from "express";
import { confirCancelmAdmin, confirmAdmin } from "../controller/confirmMail.js";

const router = express.Router();

router.post("/konfirmasi-permohonan", confirmAdmin);
router.post("/tolak-permohonan", confirCancelmAdmin);
export default router;
