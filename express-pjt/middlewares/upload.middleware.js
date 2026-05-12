const multer = require("multer"); //express에서 파일업로드를 하려면 multer이 필요해
const path = require("path"); //path는 경로나 확장자를 관리하기 위해서 필요하고
const fs = require("fs");
const crypto = require("crypto");

const uploadDir = "upload";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, //multer기능의 하나인 용량 제한 2메가
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("이미지 파일만 업로드 가능합니다."));
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

    if (!req.file) {
      return next();
    }

    const hash = crypto
      .createHash("sha256") // 파일을 보고 해시값 생성 같은 파일이면 같은 해시값
      .update(req.file.buffer) // 메모리스토리지에 잠시 올려둔 파일을 위에 만든 해시값 사용해서 업데이트한다?
      .digest("hex"); //파일명을 사용할 수 있도록 16진수 문자열로 변환

    const ext = path.extname(req.file.originalname); //path는 extname이라는 기능이 있어서 파일의 확장자를 추출할 수 있다. 원래 파일이름에서 확장자만 추출해서 ext에 저장한다.

    console.log("originalname:", req.file.originalname);
    console.log("mimetype:", req.file.mimetype);
    console.log("ext:", ext);

    const fileName = `${hash}${ext}`;
    console.log("fileName:", fileName);
    const filePath = path.join(uploadDir, fileName); //join도 마찬가지

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, req.file.buffer); //existsSync는 fs의 파일존재여부 확인, writeFileSync는 파일을 저장
    }

    req.file.filename = fileName;

    req.file.path = filePath;

    req.file.url = `/upload/${fileName}`;

    next();
  });
}

module.exports = uploadMiddleware;
