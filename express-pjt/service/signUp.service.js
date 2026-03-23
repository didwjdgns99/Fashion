const { users } = require("../mocks/user.mock");
const { randomUUID } = require("crypto"); //구node.js 대응불가
const bcrypt = require("bcrypt");
const fs = require("fs"); //파일시스템 파일을 읽고 지울 수 있다.
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

  const exist = users.some((user) => user.email === email);
  if (exist) {
    const err = new Error(AUTH_ERROR_MESSAGE.EMAIL_ALREADY_EXISTS);
    err.status = 409;
    throw err;
  }

  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  }); //단방향 암호화 => 무차별 대입 공격 1부터 특정문자까지 다 쳐보는거, 양방향 암호화 , 좀 더 안전한 알고리즘
  //bcrypt는 cpu오래 사용해서 느리게 하기
  //Argon2id cpu + 메모리 => 느리고 비싸게
  users.push({ id: randomUUID(), email, password: hashedPassword, nickName });
  console.log(users);
  return { message: "회원가입 성공!" };
}

module.exports = { signUpService };
