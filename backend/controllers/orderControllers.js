import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderSchema.js";

//desc      -> create new order
//routes    ->post /api/orders/
//access    ->private (user)->only logged in user
//          req.user -->came from authMiddleware
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No orders found");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, //we store the id of product in product variable instead of storeing in id variable
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      shippingPrice,
      itemsPrice,
      taxPrice,
      totalPrice,
      paymentMethod,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

//desc      -> get all orders of users
//routes    ->get /api/orders/mine
//access    ->private (user)->only logged in user
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }); // find each everywhere order in database for this specific user
  res.status(200).json(orders);
});

//desc      ->mark order to paid
//routes    ->put /api/orders/:id/pay
//access    ->private (user)->only logged in user
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id, //payment id of customer
      status: req.body.status, //status of payment
      update_time: req.body.update_time, //payment time
      email_address: req.body.payer.email_address, //customer email
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//admin

//desc      ->get order details by id by user side. user done order and then getdails of that order
//routes    ->get /api/orders/:id
//access    ->private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//desc      -> get all orders by admin
//routes    ->get /api/orders
//access    ->private admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id, name");
  if (orders) {
    res.status(200).json(orders);
  }
});

//desc      ->mark deliverd from admin
//routes    ->put /api/orders/:id/deliver
//access    ->private admin
export const updateOrderToDeliverd = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
