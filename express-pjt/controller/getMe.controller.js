const jwt = require("jsonwebtoken");
const { getMeService } = require("../service/getMe.service");

async function getMeController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "로그인되지 않은 사용자입니다." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getMeService(decode.userId);

    return res.status(200).json({
      message: "사용자 조회 성공",
      user: {
        id: user.id,
        email: user.eamil,
        nickName: user.nickName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("getMeController error:", error);
    return res.status(error.status || 401).json({
      message: error.message || "사용자 조회 실패",
    });
  }
}

module.exports = { getMeController };
