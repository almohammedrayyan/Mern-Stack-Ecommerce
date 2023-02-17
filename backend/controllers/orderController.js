const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandling = require("../utils/errorHandlig");
const catchError = require("../middleware/catchAsyncError");
const { now } = require("mongoose");
//Create a new order
exports.newOrder = catchError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

//get Single Order

exports.getSingleOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandling("Order not found with this Id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in order
exports.getMyOrder = catchError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders ---admin
exports.getAllOrders = catchError(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});
//update order status ---admin
exports.updateOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandling("Order not found with this Id", 404));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
//delete a order --admin

exports.deleteOrder = catchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
