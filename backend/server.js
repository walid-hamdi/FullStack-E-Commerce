import express from "express";
const app = express();
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT | 5000;

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running or port ${port} ${process.env.NODE_ENV}`);
});
