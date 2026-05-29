const {
  loginService,
  ERROR_MESSAGE,
  logoutService,
} = require("../service/auth.service");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        isError: true,
        message: "이메일과 비밀번호를 입력해주세요.",
      });
    }

    const { id, token } = await loginService({ email, password });
    //쿠키설정(이름 , 값 , 옵션)
    //브라우저에 "token" 이라는 쿠키를 저장해라 값은 JWT 토큰이다
    res.cookie("token", token, {
      httpOnly: true, //JavaScript에서 쿠키 접근 불가
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", //중간보안 간편로그인 허용
      path: "/",
      ...(process.env.NODE_ENV === "production" && {
        domain: ".fashion-jh.shop",
      }),
      maxAge: 60 * 60 * 1000, //쿠키 유효시간
    });

    return res.status(200).json({
      isError: false,
      message: "로그인 성공",
      user: { id },
      token,
    });
  } catch (err) {
    // 4) 서비스 에러를 HTTP 에러로 변환 (컨트롤러 역할)
    console.error("loginController error:", err);
    if (err.code === ERROR_MESSAGE.USER_NOT_FOUND) {
      return res
        .status(401)
        .json({ isError: true, message: ERROR_MESSAGE.USER_NOT_FOUND });
    }
    if (err.code === ERROR_MESSAGE.INVALID_PASSWORD) {
      return res
        .status(401)
        .json({ isError: true, message: ERROR_MESSAGE.INVALID_PASSWORD });
    }
    if (err.code === ERROR_MESSAGE.JWT_SECRET_MISSING) {
      return res
        .status(500)
        .json({ isError: true, message: ERROR_MESSAGE.JWT_SECRET_MISSING });
    }

    return res.status(500).json({
      isError: true,
      message: "서버 오류",
    });
  }
}

//DB작업 없음 => async 안붙여도됨
function logoutController(req, res) {
  try {
    logoutService(res);
    return res.status(200).json({
      isError: false,
      message: "로그아웃 성공",
    });
  } catch (error) {
    console.error("logoutController error:", error);
    return res.status(500).json({
      isError: true,
      message: "로그아웃 실패",
    });
  }
}

module.exports = { loginController, logoutController };
