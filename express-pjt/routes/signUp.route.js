const signUpRoute = require("express").Router();
const { signUpController } = require("../controller/signUp.comtroller");

signUpRoute.post("/", signUpController);

module.exports = signUpRoute;
