import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "../backend/routes/productRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();

await connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// app.get("/", (req, res) => {
//   res.send("api running ...");
// });

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on server localhost:${PORT}`);
});
