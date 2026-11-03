const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    _id: false,
  },
);

const shippingAddressSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: true,
      trim: true,
    },
    recipientPhone: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    detailAddress: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryRequest: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      default: [],
    },

    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["결제대기", "결제완료", "배송중", "배송완료", "반품/취소"],
      default: "결제대기",
    },

    deliveryStatus: {
      type: String,
      enum: ["상품 준비중", "배송중", "배송완료", "반품/취소"],
      default: "상품 준비중",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    paymentKey: {
      type: String,
      default: null,
    },
    returnRequestedAt: {
      type: Date,
      default: null,
    },
    returnReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
