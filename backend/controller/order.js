import Order from "../models/order.js";
import expressHandler from "express-async-handler";

const placeOrder = expressHandler(async (req, res) => {
  const {
    orderItems,
    itemPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    shippingAddress,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.state(400);
    throw new Error("No oder items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod,
      shippingAddress,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrderById = expressHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});
const updatedOrderToPay = expressHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { id, status, updated_time, payer } = req.body;

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id,
      status,
      updated_time,
      email_address: payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("No order Payment result found");
  }
});

const getMyOrder = expressHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { placeOrder, getOrderById, updatedOrderToPay, getMyOrder };
