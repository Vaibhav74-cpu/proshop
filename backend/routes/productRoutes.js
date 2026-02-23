import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createProduct).get(getProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById) //user
  .put(protect, admin, updateProduct) //admin
  .delete(protect, admin, deleteProduct); //admin

router.route("/:id/reviews").post(protect, createReview);
export default router;
