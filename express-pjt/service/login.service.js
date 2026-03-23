const jwt = require("jsonwebtoken");
const { users } = require("../mocks/user.mock");
const bcrypt = require("bcrypt"); //비밀번호 저장 해싱 라이브러리

const ERROR_MESSAGE = {
  USER_NOT_FOUND: "이메일을 찾을 수 없습니다.",
  INVALID_PASSWORD: "비밀번호가 맞지 않습니다.",
  JWT_SECRET_MISSING: "시크릿 키 값이 맞지 않습니다.",
};

async function loginService({ email, password }) {
  const user = users.find((user) => user.email === email);
  if (!user) {
    const err = new Error(ERROR_MESSAGE.USER_NOT_FOUND);
    err.code = ERROR_MESSAGE.USER_NOT_FOUND;
    throw err;
  }

  //DB에 해싱되서 보관되어있는 값과 사용자가 입력한 비밀번호값을 해싱해서 비교
  //argon은 저장된 해시값 먼저
  const isMatch = await argon2.verify(user.password, password);

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

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

  return {
    userId: user.id,
    token,
  };
}

module.exports = { loginService, ERROR_MESSAGE };
