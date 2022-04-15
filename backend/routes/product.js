import express from "express";
import { getProductById, getProducts } from "../controller/product.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
