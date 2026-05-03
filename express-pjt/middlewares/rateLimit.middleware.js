//디도스 공격 방지 미들웨어
const rateLimit = require("express-rate-limit"); //express전용 디도스 방지 미들웨어

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: {
    isError: true,
    message: "1분에 50회 이상 요청할 수 없습니다.",
  },
});

module.exports = limiter;
