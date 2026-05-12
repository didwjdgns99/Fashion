const { confirmPaymentService } = require("../service/payment.service");

async function confirmPaymentController(req, res) {
  try {
    const result = await confirmPaymentService(req.body);

    return res.status(200).json({
      isError: false,
      message: "결제 승인 성공",
      order: result.order, //업데이트된 몽고디비의 res
      payment: result.payment, //토스에서 준 승인결과
    });
  } catch (error) {
    console.error("confirmPaymentController error", error);
    return res.status(error.status || 500).json({
      isError: true,
      message: error.message || "결제 승인 실패",
    });
  }
}

module.exports = { confirmPaymentController };
