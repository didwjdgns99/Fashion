const cartRoute = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  getCartController,
  addCartController,
  deleteCartController,
  patchCartController,
} = require("../controller/cart.controller");

cartRoute.get("/", authMiddleware, getCartController);
cartRoute.post("/", authMiddleware, addCartController);
cartRoute.patch("/", authMiddleware, patchCartController);
cartRoute.delete("/", authMiddleware, deleteCartController);

module.exports = cartRoute;
