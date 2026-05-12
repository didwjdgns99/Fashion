const { createOrderService } = require("../service/createOrderService");

async function createOrderController(req, res) {
  try {
    const order = await createOrderService(req.userId);

    return res.status(201).json({
      isError: false,
      message: "주문 생성 성공",
      order,
    });
  } catch (error) {
    console.error("createOrderController error:", error);

    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "주문 생성 실패",
    });
  }
}

module.exports = {
  createOrderController,
};
