const productsService = require("../service/products.service");

async function getProducts(req, res) {
  try {
    const size = Number(req.query.size ?? 6);
    const cursor = req.query.cursor ?? null;
    const keyword = req.query.keyword ?? "";
    const category = req.query.category ?? "";

    if (Number.isNaN(size) || size <= 0)
      return res.status(400).json({
        message: "잘못된 사이즈값이 들어왔습니다.",
      });

    const result = await productsService.getProducts({
      size,
      cursor,
      keyword,
      category,
    });

    // 정상 응답
    return res.json({
      message: "상품조회 성공",
      ...result,
    });
  } catch (error) {
    console.error("getProducts error:", error);

    return res.status(500).json({
      message: "상품 조회 중 오류 발생",
    });
  }
}

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await productsService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "상품을 찾을 수 없습니다",
      });
    }

    return res.json({
      message: "상품 조회 성공",
      product,
    });
  } catch (error) {
    console.log("단일 상품 조회 실패", error);
    return res.status(500).json({
      message: "단일 상품 조회 실패",
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
};
