import { response } from "../utils/response.js";

// 404错误
export const error404Handler = (req, res, next) => {
  res.json(response.apiNotFound())
}

// 全局错误
export const errorHandler = (err, req, res, next) => {
  const msg = err.message
  res.json(response.fail(msg))
}