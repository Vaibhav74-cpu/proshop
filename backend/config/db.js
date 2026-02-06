import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connect succesfuuly`);
  } catch (error) {
    console.log(`connection error ${error.message}`);
  }
};

export default connectDB;
