const usersRoute = require("express").Router();
const { users } = require("../mocks/user.mock");
// const { authMiddleware } = require("../middlewares/auth.middleware");

usersRoute.get("/", (req, res) => {
  console.log("성공");
  return res.json({
    message: "this is user route entrypoint",
    users,
  });
});

module.exports = usersRoute;
// usersRoute.get("/me", authMiddleware, (req, res) => {
//   return res.json({
//     message: "this is user route entrypoint222",
//   });
// });
// module.exports = usersRoute;
