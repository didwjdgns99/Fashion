//코드로 구글 access token 요청
//일반 회원은 프로바이더랑 프로바이더아이디가 없다.
//없으면 신규가입
//없지만 이메일이 구글에서 준 데이터와 같다면 연동 => 구글 로그인 간으
//있으면 이미 간편 로그인한 회원

const { users } = require("../mocks/user.mock");
const { randomUUID } = require("crypto");

const OAUTH_ERROR_MESSAGE = {
  CODE_MISSING: "인가 코드가 없습니다.",
  ACCESS_TOKEN_MISSING: "액세스 토큰을 가져오지 못했습니다.",
  EMAIL_MISSING: "구글 계정에서 이메일 정보를 가져오지 못했습니다.",
};

async function getGoogleToken(code) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID, //구글 클라이언트 아이디 어떤 아이디한테 받을건지
    client_secret: process.env.GOOGLE_CLIENT_SECRET, //그 아이디의 시크릿키가 뭔지 아이디 비번 둘 다 맞아야 토큰 발급
    redirect_uri: process.env.GOOGLE_REDIRECT_URI, //실행 후 다시 서버로 콜백
    grant_type: "authorization_code",
    code, //구글에 데이터르 코드로 받아서 사용
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", //데이터를 앤퍼샌드로 이어 붙여서 보낸다. 그냥 웹의 오래된 표준이라서
    },
    body: params.toString(), //서버는 문자열만 받음
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.error_description || "구글 토큰 요청 실패"); //구글이 보내주는 응답 || 구글 토큰 요청 실패
    err.status = 400;
    throw err;
  }

  if (!data.access_token) {
    const err = new Error(OAUTH_ERROR_MESSAGE.ACCESS_TOKEN_MISSING);
    err.status = 400;
    throw err;
  }

  return data.access_token;
}

async function getGoogleUserInfo(accessToken) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error("구글 사용자 정보 요청 실패");
    err.status = 400;
    throw err;
  }

  if (!data.email) {
    const err = new Error(OAUTH_ERROR_MESSAGE.EMAIL_MISSING);
    err.status = 400;
    throw err;
  }

  return data;
}

async function findOrCreateGoogleUser(googleUser) {
  const { sub, email, name, picture } = googleUser;

  let existUser = users.find(
    (user) => user.provider === "google" && user.providerId === sub,
  );

  if (existUser) {
    return existUser;
  }

  const sameEmailUser = users.find((user) => user.email === email);

  if (sameEmailUser) {
    sameEmailUser.provider = "google";
    sameEmailUser.providerId = sub;
    sameEmailUser.profileImage = picture || null;

    if (!sameEmailUser.nickName) {
      sameEmailUser.nickName = name || email.split("@")[0];
    }
    return sameEmailUser;
  }

  const newUser = {
    id: randomUUID(),
    email,
    nickName: name || email.split("@")[0],
    password: null,
    provider: "google",
    providerId: sub,
    profileImage: picture || null,
  };

  users.push(newUser);

  return newUser;
}

async function loginWithGoogle(code) {
  const accessToken = await getGoogleToken(code);

  const googleUser = await getGoogleUserInfo(accessToken);

  const user = await findOrCreateGoogleUser(googleUser);

  return user;
}

module.exports = {
  getGoogleToken,
  getGoogleUserInfo,
  findOrCreateGoogleUser,
  loginWithGoogle,
};
