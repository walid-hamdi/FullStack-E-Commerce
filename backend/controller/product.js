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

const deleteProductByAdmin = expressHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductByAdmin = expressHandler(async (req, res) => {
  const product = new Product({
    name: "sample product",
    image: "/images/sample.jpg",
    user: req.user._id,
    price: 0,
    category: "electronics",
    brand: "airport",
    countInStock: 0,
    numReview: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProductByAdmin = expressHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const { name, image, price, brand, category, countInStock } = req.body;

  if (product) {
    product.name = name;
    product.image = image;
    product.price = price;
    (product.category = category), (product.brand = brand);
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
};
