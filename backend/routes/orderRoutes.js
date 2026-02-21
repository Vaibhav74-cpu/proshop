import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDeliverd,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems) //create new order
  .get(protect, admin, getOrders); //get all order (admin)

//user
router.route("/mine").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id").get(protect, getOrderById);

//admin
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliverd);

export default router;
