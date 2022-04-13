import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import Order from "./models/order.js";
import connection from "./config/db.js";

dotenv.config();
connection();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const usersResult = await User.insertMany(users);
    const productsSample = products.map((product) => {
      return { ...product, user: usersResult[0]._id };
    });

    await Product.insertMany(productsSample);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(`Error when importing data ${error.message}`);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(`Error when importing data ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
