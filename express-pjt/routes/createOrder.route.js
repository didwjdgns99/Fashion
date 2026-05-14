const orderRoute = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  createOrderController,
  getOrderController,
} = require("../controller/createOrderController");

orderRoute.post("/", authMiddleware, createOrderController);
orderRoute.get("/", authMiddleware, getOrderController);
module.exports = orderRoute;
