import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  userLogout,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userLogout);
router.get("/profile", getUser);

export default router;
