import express from "express";
import {
  userAuth,
  userProfile,
  userRegister,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} from "../controller/user.js";
import { protect, admin } from "../middleware/protectMiddleWare.js";
const router = express.Router();

router.route("/").post(userRegister).get(protect, admin, getUsers);

router.route("/login").post(userAuth);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);

export default router;
