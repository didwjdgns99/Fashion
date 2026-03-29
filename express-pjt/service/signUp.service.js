// const { users } = require("../mocks/user.mock");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const AUTH_ERROR_MESSAGE = {
  INVALID_SIGNUP_FORMAT: "잘못된 형식의 회원가입 정보 입니다.",
  EMAIL_ALREADY_EXISTS: "이미 존재하는 이메일입니다.",
};

async function signUpService({ email, password, nickName }) {
  if (!email || !password || !nickName) {
    const err = new Error(AUTH_ERROR_MESSAGE.INVALID_SIGNUP_FORMAT);
    err.status = 400;
    throw err;
  }

  // const exist = users.some((user) => user.email === email);

  const existUser = await User.findOne({ email });

  if (existUser) {
    const err = new Error(AUTH_ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  //단방향 암호화 => 무차별 대입 공격 1부터 특정문자까지 다 쳐보는거, 양방향 암호화 , 좀 더 안전한 알고리즘
  //bcrypt는 cpu오래 사용해서 느리게 하기
  //Argon2id cpu + 메모리 => 느리고 비싸게

  //몽고DB에 저장할 때 자동으로  id생성해줌
  const newUser = await User.create({
    email,
    password: hashedPassword,
    nickName,
  });

  return newUser;
}

module.exports = { signUpService };
