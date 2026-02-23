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
    rating: 4.7,
    numReviews: 95,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// desc -> fetch all products
// route-> /api/products/
//access-> public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1; //comes from url ->2

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword }); // count documents via keyword comes from frontend

  const products = await Product.find({ ...keyword }) // find documents via keyword comes from frontend
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //skip the products = 2*(2-1)=>2

  res.json({ products, page, pages: Math.ceil(count) / pageSize });
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

// desc -> create product review
// route-> /api/products/:id/reviews
//access-> private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(), //check the incoming userid && reviews.userid are equal
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    //productschema-->reviewschema->fields
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// desc -> get top rated product
// route-> /api/products/top
//access-> public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});
