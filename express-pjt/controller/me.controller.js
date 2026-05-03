const {
  getMeService,
  patchMeService,
  deleteMeService,
} = require("../service/me.service");

async function getMeController(req, res) {
  try {
    const user = await getMeService(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ isError: true, message: "사용자를 찾을 수 없습니다." });
    }

    return res.status(200).json({
      isError: false,
      message: "사용자 조회 성공",
      user: {
        id: user._id,
        email: user.email,
        nickName: user.nickName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("getMeController error:", error);
    return res.status(error.status || 500).json({
      message: error.message || "사용자 조회 실패",
    });
  }
}

async function patchMeController(req, res) {
  try {
    const updatedUser = await patchMeService(req.userId, req.file);

    return res.status(200).json({
      isError: false,
      message: "프로필 이미지 수정 성공",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        nickName: updatedUser.nickName,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("patchMeController error:", error);

    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "프로필 이미지 수정 실패",
    });
  }
}

async function deleteMeController(req, res) {
  try {
    const user = await deleteMeService(req.userId);

    return res.status(200).json({
      isError: false,
      message: "프로필 이미지 삭제 성공",
      user: {
        id: user._id,
        email: user.email,
        nickName: user.nickName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("deleteMeController error:", error);

    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "프로필 이미지 삭제 실패",
    });
  }
}
module.exports = { getMeController, patchMeController, deleteMeController };
