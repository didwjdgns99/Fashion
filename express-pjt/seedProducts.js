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
//connet, deleteMany, insertMany, countDocuments 몽고DB 를 편하게 쓰기위한 mongoose가 제공하는 메서드
//| 메서드             | 의미      |
//| ----------------- | ------- |
//| connect           | DB 연결   |
//| find              | 데이터 조회  |
//| findById          | id로 조회  |
//| insertMany        | 여러 개 저장 |
//| create            | 1개 저장   |
//| deleteMany        | 여러 개 삭제 |
//| findByIdAndDelete | 1개 삭제   |
//| updateOne         | 수정      |
//| countDocuments    | 개수 세기   |
