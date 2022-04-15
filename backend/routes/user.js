import express from "express";
import { userAuth, userProfile, userRegister } from "../controller/user.js";
import { profileMiddleWare } from "../middleware/profileMiddleWare.js";
const router = express.Router();

router.route("/login").post(userAuth);
router.route("/register").post(userRegister);
router.route("/profile").get(profileMiddleWare, userProfile);

export default router;
