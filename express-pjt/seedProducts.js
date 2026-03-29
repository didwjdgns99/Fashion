const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product.model");
const { products } = require("./mocks/products");

dotenv.config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB 연결 성공");

    // 기존 데이터 삭제
    await Product.deleteMany({});
    console.log("기존 상품 삭제 완료");

    // mock 데이터 삽입
    await Product.insertMany(products);
    console.log("상품 데이터 삽입 완료");

    const count = await Product.countDocuments();
    console.log("현재 상품 개수:", count);

    process.exit();
  } catch (error) {
    console.error("시드 에러:", error);
    process.exit(1);
  }
}

seedProducts();
