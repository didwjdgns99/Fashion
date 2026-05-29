const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt = require("bcrypt"); //비밀번호 저장 해싱 라이브러리

const ERROR_MESSAGE = {
  USER_NOT_FOUND: "이메일을 찾을 수 없습니다.",
  INVALID_PASSWORD: "비밀번호가 맞지 않습니다.",
  JWT_SECRET_MISSING: "시크릿 키 값이 맞지 않습니다.",
};

async function loginService({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    err.code = ERROR_MESSAGE.USER_NOT_FOUND;
    throw err;
  }

  //DB에 해싱되서 보관되어있는 값과 사용자가 입력한 비밀번호값을 해싱해서 비교
  //argon은 저장된 해시값 먼저
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    err.code = ERROR_MESSAGE.INVALID_PASSWORD;
    throw err;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error(ERROR_MESSAGE.JWT_SECRET_MISSING);
    err.code = ERROR_MESSAGE.JWT_SECRET_MISSING;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, nickName: user.nickName },
    secret,
    { expiresIn: "1h" },
  );

  return {
    id: user.id,
    token,
  };
}
function logoutService(res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(process.env.NODE_ENV === "production" && {
      domain: ".fashion-jh.shop",
    }),
  });

  return {
    isError: false,
    message: "로그아웃 성공",
  };
}

module.exports = { loginService, logoutService, ERROR_MESSAGE };
