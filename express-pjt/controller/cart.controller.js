const {
  getPopulatedCart,
  addCartService,
  deleteCartService,
  patchCartService,
} = require("../service/cart.service");

async function getCartController(req, res) {
  try {
    const userId = req.userId;

    const cart = await getPopulatedCart(userId);
    return res.status(200).json({
      isError: false,
      cart,
    });
  } catch (error) {
    console.error("getCartController error:", error);

    return res.status(500).json({
      isError: true,
      message: "장바구니 조회 중 오류가 발생했습니다.",
    });
  }
}

async function addCartController(req, res) {
  try {
    const userId = req.userId;
    const item = req.body;
    if (!item || !item.productId || !item.size) {
      return res.status(400).json({
        isError: true,
        message: "상품정보가 올바르지 않습니다.",
      });
    }
    const cart = await addCartService(userId, item);

    if (!cart) {
      return res.status(404).json({
        isError: true,
        message: "상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      isError: false,
      message: "장바구니에 상품이 추가되었습니다.",
      cart,
    });
  } catch (error) {
    console.error("addCartController error:", error);

    return res.status(500).json({
      isError: true,
      message: "장바구니 추가 중 오류가 발생했습니다.",
    });
  }
}

async function patchCartController(req, res) {
  try {
    const userId = req.userId;
    const { productId, size, quantity } = req.body;

    if (!productId || !size || quantity < 1) {
      return res.status(400).json({
        isError: true,
        message: "수정할 상품 정보가 올바르지 않습니다.",
      });
    }

    const cart = await patchCartService(userId, productId, size, quantity);

    if (!cart) {
      return res.status(404).json({
        isError: true,
        message: "장바구니 상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      isError: false,
      message: "상품의 수량이 수정되었습니다.",
      cart,
    });
  } catch (error) {
    console.error("patchCartController error:", error);

    return res.status(500).json({
      isError: true,
      message: "수량 변경 중 오류가 발생했습니다.",
    });
  }
}

async function deleteCartController(req, res) {
  try {
    const userId = req.userId;

    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        isError: true,
        message: "삭제할 상품 정보가 부족합니다.",
      });
    }

    const cart = await deleteCartService(userId, productId, size);

    if (!cart) {
      return res.status(404).json({
        isError: true,
        message: "삭제할 장바구니 상품을 찾을 수 없습니다.",
      });
    }

    return res.status(200).json({
      isError: false,
      message: "상품이 장바구니에서 삭제되었습니다.",
      cart,
    });
  } catch (error) {
    console.error("deleteCartController error:", error);

    return res.status(500).json({
      isError: true,
      message: "장바구니 삭제 중 오류가 발생했습니다.",
    });
  }
}

module.exports = {
  getCartController,
  addCartController,
  deleteCartController,
  patchCartController,
};
