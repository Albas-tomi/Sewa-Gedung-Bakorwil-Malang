import express from "express";
import {
  confirCancelmAdmin,
  confirmAdmin,
  confirmTolakmAdmin,
  tolakCancelAdmin,
} from "../controller/confirmMail.js";

const router = express.Router();

router.post("/konfirmasi-permohonan", confirmAdmin);
router.post("/tolak-permohonan", confirmTolakmAdmin);
router.post("/terima-permohonan-cancel", confirCancelmAdmin);
router.post("/tolak-permohonan-cancel", tolakCancelAdmin);
export default router;
