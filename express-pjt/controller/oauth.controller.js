const { loginWithGoogle } = require("../service/oauth.service");
const jwt = require("jsonwebtoken");

function googleOAuthStart(req, res) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID, //구글한테 내가만든 간편로그인 앱 알려주기
    redirect_uri: process.env.GOOGLE_REDIRECT_URI, //로구인 후 돌아올 서버 주소
    response_type: "code", //코드로 받아서 나중에 액세스토큰 요청
    scope: "openid email profile", // 허용 범위
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return res.redirect(url);
}

async function googleOAuthCallback(req, res) {
  try {
    const { code } = req.query;
    const user = await loginWithGoogle(code);

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nickName: user.nickName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });

    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    console.error("googleOAuthCallback error:", error);
    return res.status(error.status || 500).json({
      message: error.message || "구글 로그인 실패",
    });
  }
}

module.exports = {
  googleOAuthStart,
  googleOAuthCallback,
};
