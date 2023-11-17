import express from "express";
import {
  getAdminUser,
  getAllAdminUsers,
  loginAdminUser,
  registerAdmin,
  userAdminLogout,
} from "../controller/adminUserController.js";

const router = express.Router();

router.post("/admin-register", registerAdmin);
router.post("/admin-login", loginAdminUser);
router.post("/admin-logout", userAdminLogout);
router.get("/admin-user", getAdminUser);
router.get("/admin-users", getAllAdminUsers);

export default router;
