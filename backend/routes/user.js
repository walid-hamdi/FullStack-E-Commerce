import express from "express";
import {
  userAuth,
  userProfile,
  userRegister,
  updateUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} from "../controller/user.js";
import { protect, admin } from "../middleware/protectMiddleWare.js";
const router = express.Router();

router.route("/").post(userRegister).get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);
router.route("/login").post(userAuth);
router.route("/profile").get(protect, userProfile);
router.route("/updateUser").put(protect, updateUser);

export default router;
