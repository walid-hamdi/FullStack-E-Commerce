import express from "express";
import Product from "../models/product.js";
const router = express.Router();
import expressHandler from "express-async-handler";

router.get(
  "/",
  expressHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  expressHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  })
);

export default router;
