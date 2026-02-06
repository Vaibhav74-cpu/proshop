import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import products from "./DummyData/product.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("api running ...");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item._id === req.params.id);
  res.send(product);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on server localhost:${PORT}`);
});
