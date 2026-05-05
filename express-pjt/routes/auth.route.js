const authRoute = require("express").Router();
const {
  loginController,
  logoutController,
} = require("../controller/auth.controller");

authRoute.post("/login", loginController);
authRoute.post("/logout", logoutController);
module.exports = authRoute;
