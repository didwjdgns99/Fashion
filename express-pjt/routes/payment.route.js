const express = require("express");
const {
  confirmPaymentController,
} = require("../controller/payment.controller");

const router = express.Router();

router.post("/confirm", confirmPaymentController);

module.exports = router;
