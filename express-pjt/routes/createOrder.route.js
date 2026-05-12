const orderRoute = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  createOrderController,
} = require("../controller/createOrderController");

orderRoute.post("/", authMiddleware, createOrderController);

module.exports = orderRoute;
