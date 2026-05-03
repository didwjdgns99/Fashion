const meRoute = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  getMeController,
  patchMeController,
  deleteMeController,
} = require("../controller/me.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");

meRoute.get("/", authMiddleware, getMeController);
meRoute.patch("/", authMiddleware, uploadMiddleware, patchMeController);
meRoute.delete("/", authMiddleware, deleteMeController);
module.exports = meRoute;
