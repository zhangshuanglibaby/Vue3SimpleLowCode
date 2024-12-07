import Joi from "joi";
import { omit } from "lodash-es"

import { response } from "../utils/response.js";
import { packageDAO } from "../dao/index.js";
import validate from "../middleware/validate.js"

export class PackageController {
  findAll() {
    // 验证参数 查询参数
    const rules = Joi.object({
      id: Joi.number().min(1).optional(),
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional()
    })
    const handler = async (req, res) => {
      const { page, size, id } = req.query
      const { status, message, result } = await packageDAO.findAll(page, size, id)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    // 返回两个中间件
    return [
      validate(rules),
      handler
    ]
  }
  findOne() {
    const rules = Joi.object({
      id: Joi.number().optional()
    })
    const handler = async (req, res) => {
      const { id } = req.params
      const { status, message, result } = await packageDAO.findOne(id)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    return[
      validate(rules),
      handler
    ]
  }
  create() {
    const rules = Joi.object({
      name: Joi.string().optional(),
      content: Joi.string().optional()
    })
    const handler = async (req, res) => {
      const { status, message, result } = await packageDAO.create(req.body)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    return[
      validate(rules, 'body'),
      handler
    ]
  }
  update() {
    const rules = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().optional(),
      content: Joi.string().optional()
    })
    const handler = async (req, res) => {
      const pickBody = omit(req.body, ['id'])
      const { id } = req.body
      const { status, message, result } = await packageDAO.update(pickBody, id)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }

    return [
      validate(rules, 'body'),
      handler
    ]
  }
  remove() {
    const rules = Joi.object({
      id: Joi.number().required()
    })
    const handler = async (req, res) => {
      const { id } = req.body
      const { status, message, result } = await packageDAO.remove(id)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    return [
      validate(rules, 'body'),
      handler
    ]
  }
}