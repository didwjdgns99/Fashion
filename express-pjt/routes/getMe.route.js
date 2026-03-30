const getMeRoute = require("express").Router();
const { getMeController } = require("../controller/getMe.controller");

getMeRoute.get("/", getMeController);

module.exports = getMeRoute;
