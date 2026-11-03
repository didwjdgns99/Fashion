const {
  createOrderService,
  getOrderService,
  updateOrderActionService,
} = require("../service/createOrderService");

async function createOrderController(req, res) {
  try {
    const order = await createOrderService(
      req.userId,
      req.body?.shippingAddress,
    );

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

async function getOrderController(req, res) {
  try {
    const orders = await getOrderService(req.userId);

    return res.status(201).json({
      isError: false,
      message: "주문 조회 성공",
      orders,
    });
  } catch (error) {
    console.error("getOrderController", error);

    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "주문 조회 실패",
    });
  }
}

async function updateOrderActionController(req, res) {
  const { orderId } = req.params;
  const { action } = req.body;
  console.info("[주문 컨트롤러] 요청 수신", { orderId, action });

  try {
    const order = await updateOrderActionService({
      userId: req.userId,
      orderId,
      action,
    });

    console.info("[주문 컨트롤러] 처리 성공", { orderId, action });
    return res.status(200).json({
      isError: false,
      message:
        action === "cancel"
          ? "주문이 취소되었습니다."
          : "반품 요청이 접수되었습니다.",
      order,
    });
  } catch (error) {
    console.error("[주문 컨트롤러] 서비스 처리 실패", {
      orderId,
      action,
      status: error.status || 500,
      message: error.message,
      stack: error.stack,
    });

    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "주문 처리를 완료하지 못했습니다.",
    });
  }
}

module.exports = {
  createOrderController,
  getOrderController,
  updateOrderActionController,
};
