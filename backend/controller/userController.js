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
            res.cookie("token", token).json(userDoc);
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
