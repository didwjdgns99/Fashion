const { loginService, ERROR_MESSAGE } = require("../service/login.service");

async function loginController(req, res) {
  console.log("✅ loginController 들어옴");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        isError: true,
        message: "이메일과 비밀번호를 입력해주세요.",
      });
    }

    const { userId, token } = await loginService({ email, password });
    //쿠키설정(이름 , 값 , 옵션)
    //브라우저에 "token" 이라는 쿠키를 저장해라 값은 JWT 토큰이다
    res.cookie("token", token, {
      httpOnly: true, //JavaScript에서 쿠키 접근 불가
      sameSite: "lax", //중간보안 간편로그인 허용
      maxAge: 60 * 60 * 1000, //쿠키 유효시간
    });

    return res.status(200).json({
      isError: false,
      message: "로그인 성공",
      user: { id: userId },
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

module.exports = { loginController };
