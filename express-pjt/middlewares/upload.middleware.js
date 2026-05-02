const multer = require("multer"); //express에서 파일업로드를 하려면 multer이 필요해
const path = require("path"); //path는 경로나 확장자를 관리하기 위해서 필요하고

const storage = multer.diskStorage({
  //multer을 사용해서 diskStorage에 저장하겠다
  destination: (req, file, cb) => {
    //destination: 저장위치는 req와 파일, callback을 받아서
    cb(null, "upload/"); //upload 라고 경로에 저장하겠다 이건 express-pjt/upload라는 폴더를 만들어야함
  },

  filename: (req, file, cb) => {
    //파일이름을 만들기 위한 multer의 기능
    const extend = path.extname(file.originalname); //확장자 추출해서
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extend}`; //현재날짜 - 0~1사이의 랜덤수 * 1000000000 하고 반올림한값. 추풀한 확장자를 파일이름으로 하겠다.

    cb(null, fileName); // 에러는 없고 파일을 이렇게 저장해줘
  },
});

const multerUpload = multer({
  // 위에 작성한 storage (저장위치, 파일이름) + 용량과 이미지 파일이 맞는지 검사하는 진짜 미들웨어
  storage, //위에서 만든 저장위치와 파일이름
  limits: {
    fileSize: 1024 * 1024 * 2, //multer기능의 하나인 용량 제한 2메가
  },

  fileFilter: (req, file, cb) => {
    //multer의 기능의 하나인 filefilter
    if (!file.mimetype.startsWith("image/")) {
      // 파일이 image, apllication, text, video, audio 같은 타입 중 image가 아니면
      return cb(new Error("이미지 파일만 업로드 가능합니다.")); // 에러 콜백
    }

    cb(null, true); // 그렇지 않으면 업로드 계속 진행
  },
});

function uploadMiddleware(req, res, next) {
  //formData에서 profileImage라는 파일 하나만 받는다.
  multerUpload.single("profileImage")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          isError: true,
          message: "파일 용량은 2MB 이하만 가능합니다.",
        });
      }

      return res.status(400).json({
        isError: true,
        message: err.message,
      });
    }

    next();
  });
}

module.exports = uploadMiddleware;
