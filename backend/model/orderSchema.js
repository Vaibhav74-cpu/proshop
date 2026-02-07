import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      //used array cause order conatins 1,2 or more product
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, require: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String, // upi / cash / credit card (comes from frontend then go for validation in backend)
      required: true,
    },
    paymentResult: {
      id: { type: String }, //generate unique payment id by payment gateway
      status: { type: String }, // pending completed on ui
      update_time: { type: String }, // payment created at
      email_address: { type: String }, // email address display on ui of that person done the payment
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true,
    },
    deliveredAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
