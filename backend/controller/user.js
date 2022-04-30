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
        isAdmin: user.isAdmin,
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

const updateUserProfile = expressHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = expressHandler(async (req, res) => {
  const users = await User.find();

  res.json(users);
});

const deleteUser = expressHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getUserById = expressHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserByAdmin = expressHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { name, email, isAdmin } = req.body;
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.idAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Can't update user");
  }
});

export {
  userAuth,
  userProfile,
  userRegister,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
};
