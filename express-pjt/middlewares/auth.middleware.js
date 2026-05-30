const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    console.log("token:", token);
    if (!token) {
      console.log("토큰 없음");
      return res.status(401).json({
        isError: true,
        message: "로그인이 필요합니다.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("토큰 검증 성공");
    req.userId = decode.id;
    next();
  } catch (error) {
    console.log("토큰 검증 실패");
    return res.status(401).json({
      isError: true,
      message: "유효하지 않은 토큰입니다.",
    });
  }
}

module.exports = { authMiddleware };
