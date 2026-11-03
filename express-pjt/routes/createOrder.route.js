const orderRoute = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  createOrderController,
  getOrderController,
  updateOrderActionController,
} = require("../controller/createOrderController");

orderRoute.post("/", authMiddleware, createOrderController);
orderRoute.get("/", authMiddleware, getOrderController);
orderRoute.patch("/:orderId", authMiddleware, updateOrderActionController);
module.exports = orderRoute;
