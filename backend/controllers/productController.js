import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productSchema.js";
// import products from '../DummyData/product.js';

// desc -> create new product
// route-> /api/products/
//access-> private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    image: "image",
    user: req.user._id,
    description: "sample description",
    brand: "sample brand",
    category: "sample category",
    price: 12354,
    countInStock: 8,
    // rating: 4.7,
    numReviews: 95,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// desc -> fetch all products
// route-> /api/products/
//access-> public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.status(200).json(products);
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

// desc -> update product details
// route-> /api/products/:id
//access-> private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, description, price, countInStock, image } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// desc -> delete a product
// route-> /api/products/:id
//access-> private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
