import Product from "../models/product.js";
import expressHandler from "express-async-handler";

const getProducts = expressHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = expressHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById };
