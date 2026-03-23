const productsRoute = require("express").Router();
const productsController = require("../controller/products.controller");

productsRoute.get("/", productsController.getProducts);
productsRoute.get("/:id", productsController.getProduct);

module.exports = productsRoute;
