/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

//JSDoc

const loggerMiddleware = (req, _res, next) => {
  const pathName = req.originalUrl ?? "(none)";
  const method = req.method ?? "GET";
  console.log(`[${method}] ${pathName} ${Date.now()}`);
  console.log(method, pathName);
  //next() 쓰지 않으면 미들웨어를 거치고 다음 단계로 넘어가지 않는다.
  next();
};

module.exports = loggerMiddleware;
