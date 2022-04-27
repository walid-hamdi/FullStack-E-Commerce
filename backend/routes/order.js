import express from "express";
import { protect } from "../middleware/protectMiddleWare.js";
import {
  placeOrder,
  getOrderById,
  updatedOrderToPay,
  getMyOrder,
} from "../controller/order.js";

const router = express.Router();

router.route("/").post(protect, placeOrder);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").post(protect, updatedOrderToPay);

export default router;
