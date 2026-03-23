const loginRoute = require("express").Router();
const { loginController } = require("../controller/login.controller");

loginRoute.post("/", loginController);

module.exports = loginRoute;
