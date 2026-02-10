import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productSchema.js";
// import products from '../DummyData/product.js';

// desc -> fetch all products
// route-> /api/products/
//access-> public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// desc -> fetch a product
// route-> /api/products/:id
//access-> public
export const getProductById = asyncHandler(async (req, res) => {
  // const product = products.find((item) => item._id === req.params.id);
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});
