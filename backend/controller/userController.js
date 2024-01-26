import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "{];l%%$45%^7686gwhdvdhbewrjnefjnrktgjkrntglk+_P}{/";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  try {
    if (userDoc) {
      const passwordOk = bcrypt.compareSync(password, userDoc.password);
      if (passwordOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, name: userDoc.name },
          jwtSecret,
          {},
          (error, token) => {
            if (error) throw error;
            res.cookie("token", token).json(token);
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

export const userLogout = (req, res) => {
  try {
    res.cookie("token", "").json(true);
  } catch (error) {
    res.json(error.message);
  }
};

export const getUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;

      const { email, name, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json(`Behasil menghapus user ${req.params.id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const editedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(editedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);

    res.json({ name: userData.name, email: userData.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
