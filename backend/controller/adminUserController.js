import AdminUser from "../models/adminUsers.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret =
  "{];l%%$45%^7686gwhdhqghas900277345bk4rjkvdhbewrjnefjnrktgjkrntglk+_P}{/";

export const registerAdmin = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const userDoc = await AdminUser.create({
      name,
      email,
      role,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error.message);
  }
};

export const loginAdminUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await AdminUser.findOne({ email });
  try {
    if (userDoc) {
      const passwordOk = bcrypt.compareSync(password, userDoc.password);
      if (passwordOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
            name: userDoc.name,
            role: userDoc.role,
          },
          jwtSecret,
          {},
          (error, token) => {
            if (error) throw error;
            res.cookie("tokenAdmin", token).json(token);
          }
        );
      } else {
        res.status(422).json("Pass Not Oks");
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

export const userAdminLogout = (req, res) => {
  try {
    res.cookie("tokenAdmin", "").json(true);
  } catch (error) {
    res.json(error.message);
  }
};

export const getAdminUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;

      const { email, name, _id, role } = await AdminUser.findById(userData.id);
      res.json({ name, email, _id, role });
    });
  } else {
    res.json(null);
  }
};
export const getAllAdminUsers = async (req, res) => {
  try {
    const users = await AdminUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
