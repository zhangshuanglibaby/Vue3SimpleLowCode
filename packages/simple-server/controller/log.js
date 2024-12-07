import Joi from "joi";

import { response } from "../utils/response.js";
import { logDAO } from "../dao/index.js";
import validate from "../middleware/validate.js"

export class LogController {
  findAll() {
    // 验证参数 查询参数
    const rules = Joi.object({
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional(),
      url: Joi.string().optional(),
      url_unique: Joi.string().optional(),
    })
    const handler = async (req, res) => {
      console.log(req.query)
      const { page, size, url, url_unique } = req.query
      const { status, message, result } = await logDAO.findAll(page, size, url, url_unique)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    // 返回两个中间件
    return [
      validate(rules),
      handler
    ]
  }
}