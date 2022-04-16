import express from "express";
import {
  userAuth,
  userProfile,
  userRegister,
  updateUser,
} from "../controller/user.js";
import { protect } from "../middleware/protectMiddleWare.js";
const router = express.Router();

router.route("/login").post(userAuth);
router.route("/register").post(userRegister);
router.route("/profile").get(protect, userProfile);
router.route("/updateUser").put(protect, updateUser);

export default router;
