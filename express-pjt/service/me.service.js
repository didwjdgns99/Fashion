const User = require("../models/user.model");

async function getMeService(userId) {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("사용자를 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  return user;
}

async function patchMeService(userId, file) {
  const user = await User.findById(userId);

  if (!user) {
    const err = new Error("프로필 수정 할 유저를 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  if (!file) {
    const err = new Error("파일이 없습니다.");
    err.status = 400;
    throw err;
  }

  const imageUrl = `/upload/${file.filename}`;

  const updateUser = await User.findByIdAndUpdate(
    userId,
    { profileImage: imageUrl },
    { new: true },
  );

  return updateUser;
}

module.exports = { getMeService, patchMeService };
