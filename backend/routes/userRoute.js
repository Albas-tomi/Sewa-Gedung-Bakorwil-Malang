import express from "express";
import {
  getAllUsers,
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
router.get("/get-users", getAllUsers);

export default router;
