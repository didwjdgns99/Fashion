const apiRoute = require("express").Router();
const usersRoute = require("./users.route");
const signUpRoute = require("./signUp.route");
const loginRoute = require("./login.route");
const productsRoute = require("./products.route");
const oauthRoute = require("./oauth.route");

apiRoute.use("/users", usersRoute);
apiRoute.use("/signup", signUpRoute);
apiRoute.use("/login", loginRoute);
apiRoute.use("/products", productsRoute);
apiRoute.use("/oauth", oauthRoute);

module.exports = apiRoute;
