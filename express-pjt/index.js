require("dotenv").config();

const express = require("express"); //improt와 같은 서버 프레임워크 가져오기
const apiRoute = require("./routes");
const app = express(); //app만들기 서버본체
const loggerMiddleware = require("./middlewares/logger.middleware");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

app.use(express.json()); //브라우저 에서 보낸 문자열을 객체로 변환
app.use(express.urlencoded({ extended: true })); //폼을 받는 데이터를 객체로 변환 다른 타입 받으려면 별도 처리가 필요
app.use(cookieParser());
app.use("/upload", express.static("upload"));
//loggerMiddleware를 먼저받고 next()를 썼으니까 apiRoute로 넘어감
//토큰 유효성 확인 후 통과되면 next() 아니면 401보내기

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패", err));

app.use("/api", loggerMiddleware, apiRoute);

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on ${process.env.PORT || 8080}`);
});

//test라는 경로에 리퀘스트와 리스폰스를 가져와서 조회한다
// app.get("/test", (req, res) => {
//   const query = req.query;
//   console.log(query);
//   return res.json({ isError: false });
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body ?? {};

//   if (!email || !password) {
//     return res.status(400).json({
//       isError: true,
//       message: "올바르지 않은 형식입니다.",
//     });
//   }

//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(401).json({
//       isError: true,
//       message: "권한이 없습니다.",
//     });
//   }

//   if (user.password !== password) {
//     return res.status(401).json({
//       isError: true,
//       message: "비밀번호가 올바르지 않습니다",
//     });
//   }

//   return res.json({
//     isError: false,
//     message: "로그인 성공",
//   });
// });

// app.all("*splat", (req, res, next) => {
//   return res.status(404).json({
//     message: "올바르지 않은 api 경로입니다.",
//   });
// });

// app.listen(8080, () => {
//   console.log("running on 8080");
// });
