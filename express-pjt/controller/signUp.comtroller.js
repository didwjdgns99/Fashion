const { signUpService } = require("../service/signUp.service");

async function signUpController(req, res) {
  try {
    const { email, password, nickName } = req.body;
    const result = await signUpService({ email, password, nickName });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message || "서버 오류가 발생했습니다.",
    });
  }
}

module.exports = { signUpController };
