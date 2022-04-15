import expressHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const userAuth = expressHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const mathPassword = await bcrypt.compare(password, user.password);
    if (mathPassword) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.idAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Password invalid!");
    }
  } else {
    res.status(401);
    throw new Error("Email invalid!");
  }
});
const userRegister = expressHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(401);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.idAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Bad user info!");
  }
});

const userProfile = expressHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.idAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export { userAuth, userProfile, userRegister };
