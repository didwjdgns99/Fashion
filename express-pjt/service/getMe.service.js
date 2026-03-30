const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function getMeService(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("사용자를 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  return user;
}

module.exports = { getMeService };
