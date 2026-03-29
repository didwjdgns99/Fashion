const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    meta: {
      heart: {
        type: Number,
        required: true,
        mun: 0,
      },
      review: {
        type: String,
        default: 0,
        min: 0,
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Product", productSchema);
