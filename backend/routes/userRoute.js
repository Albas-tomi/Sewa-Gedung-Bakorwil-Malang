import express from "express";
import {
  deleteUser,
  editUser,
  getAllUsers,
  getUser,
  getUserById,
  loginUser,
  registerUser,
  userLogout,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userLogout);
router.delete("/delete-user/:id", deleteUser);
router.put("/edit-user/:id", editUser);
router.get("/profile", getUser);
router.get("/get-UserById/:id", getUserById);
router.get("/get-users", getAllUsers);

export default router;
