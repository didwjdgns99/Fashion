const apiRoute = require("express").Router();
// const usersRoute = require("./users.route");
const signUpRoute = require("./signUp.route");
const authRoute = require("./auth.route");
const productsRoute = require("./products.route");
const oauthRoute = require("./oauth.route");
const meRoute = require("./me.route");
const cartRoute = require("./cart.route");

// apiRoute.use("/users", usersRoute);
apiRoute.use("/signup", signUpRoute);
apiRoute.use("/auth", authRoute);
apiRoute.use("/products", productsRoute);
apiRoute.use("/oauth", oauthRoute);
apiRoute.use("/me", meRoute);
apiRoute.use("/cart", cartRoute);

module.exports = apiRoute;
