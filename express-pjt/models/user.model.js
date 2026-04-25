const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String, //타입
    required: true, //필수
    unique: true, //중복x
    trim: true, //공백제거
  },
  password: {
    type: String,
    required: false,
    default: null,
  },
  nickName: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    default: null, //디폴트 값
  },
  providerId: {
    type: String,
    default: null,
  },
  profileImage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
