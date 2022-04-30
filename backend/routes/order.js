import express from "express";
import { admin, protect } from "../middleware/protectMiddleWare.js";
import {
  placeOrder,
  getOrderById,
  updatedOrderToPay,
  getMyOrder,
  getOrdersToAdmin,
  updatedOrderToDelivered,
} from "../controller/order.js";

const router = express.Router();

router
  .route("/")
  .post(protect, placeOrder)
  .get(protect, admin, getOrdersToAdmin);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").post(protect, updatedOrderToPay);
router.route("/:id/delivered").post(protect, updatedOrderToDelivered);

export default router;
