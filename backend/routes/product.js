import express from "express";
import {
  createProductByAdmin,
  deleteProductByAdmin,
  getProductById,
  getProducts,
  updateProductByAdmin,
  createProductReview,
  getToProducts,
} from "../controller/product.js";
import { admin, protect } from "../middleware/protectMiddleWare.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProductByAdmin);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getToProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductByAdmin)
  .put(protect, admin, updateProductByAdmin);

export default router;
