const User = require("../models/user.model");

async function patechMyImageService({ userId, profileImage }) {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profileImage },
    { new: true },
  ).select("_id email nickName profileImage");

  return {
    id: updatedUser._id.toString(),
    email: updatedUser.email,
    nickName: updatedUser.nickName,
    profileImage: updatedUser.profileImage,
  };
}

module.exports = {
  patchMyImageService,
};
