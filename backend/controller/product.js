import Product from "../models/product.js";
import expressHandler from "express-async-handler";

const getProducts = expressHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber);

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const count = await Product.countDocuments({ ...keyword });

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

const createProductReview = expressHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const { comment, rating } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const productReviewed = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(productReviewed);

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.numReviews = product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Product review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getToProducts = expressHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  console.log("products", products);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProductByAdmin,
  createProductByAdmin,
  updateProductByAdmin,
  createProductReview,
  getToProducts,
};
