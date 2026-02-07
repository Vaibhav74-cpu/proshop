import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productsList from "./DummyData/product.js";
import users from "./DummyData/users.js";
import Order from "./model/orderSchema.js";
import Product from "./model/productSchema.js";
import User from "./model/userSchema.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const sampleProducts = productsList.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed Successfully");
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
