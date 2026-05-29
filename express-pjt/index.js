require("dotenv").config();

const express = require("express"); //improt와 같은 서버 프레임워크 가져오기
const apiRoute = require("./routes");
const app = express(); //app만들기 서버본체
app.set("trust proxy", 1);
const loggerMiddleware = require("./middlewares/logger.middleware");
const cookieParser = require("cookie-parser");
const limiter = require("./middlewares/rateLimit.middleware");
const mongoose = require("mongoose");
const botMiddleware = require("./middlewares/bot.middleware");
// const { cancelPendingOrders } = require("./service/orderCleanup.service");
const cors = require("cors");
const helmet = require("helmet");
app.use("/upload", express.static("upload"));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json()); //브라우저 에서 보낸 문자열을 객체로 변환
app.use(express.urlencoded({ extended: true })); //폼을 받는 데이터를 객체로 변환 다른 타입 받으려면 별도 처리가 필요
app.use(cookieParser());
app.use(limiter);

//loggerMiddleware를 먼저받고 next()를 썼으니까 apiRoute로 넘어감
//토큰 유효성 확인 후 통과되면 next() 아니면 401보내기

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");

    // setInterval(async () => {
    //   try {
    //     await cancelPendingOrders();
    //   } catch (error) {
    //     console.error("주문 상태 변경 실패:", error);
    //   }
    // }, 1000 * 10);
  })
  .catch((err) => console.error("MongoDB 연결 실패", err));

app.use("/api", botMiddleware, loggerMiddleware, apiRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.PORT || 8080}`);
});
