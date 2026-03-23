const productsService = require("../service/products.service");

function getProducts(req, res) {
  try {
    const size = Number(req.query.size ?? 6);
    const cursor = req.query.cursor ?? null;
    const keyword = req.query.keyword ?? "";
    const category = req.query.category ?? "";

    if (Number.isNaN(size) || size <= 0)
      return res.status(400).json({
        message: "사이즈가 없습니다.",
      });

    const result = productsService.getProducts({
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

function getProduct(req, res) {
  const id = Number(req.params.id);
  const product = productsService.getProductById(id);
  if (!product) {
    return res.status(404).json({
      message: "상품을 찾을 수 없습니다.",
    });
  }

  return res.json({
    message: "상품조회 성공",
    product,
  });
}

module.exports = {
  getProducts,
  getProduct,
};
