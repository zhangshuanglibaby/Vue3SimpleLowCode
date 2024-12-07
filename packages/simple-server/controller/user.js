import Joi from "joi";
import jwt from "jsonwebtoken"

import { response } from "../utils/response.js";
import validate from "../middleware/validate.js";
import { userDAO  } from "../dao/index.js";
import { SECRET_KEY } from "../config/index.js"

export class UserController {
  register() {
    const rules = Joi.object({
      username: Joi.string().min(6).max(20).required(),
      password: Joi.string().min(8).max(32).required()
    })

     const handler = async (req, res) => {
      const { status, message, result } = await userDAO.register(req.body)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }

    return [
      validate(rules, 'body'),
      handler
    ]
  }

  login () {
    const rules = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })

    const handler = async (req, res) => {
      const { status, message, result } = await userDAO.login(req.body)
      if(!status) return res.json(response.fail(message))
      const [ data ] = result
      if(data) {
        if(data.disable) { // 登录的用户是禁止状态
          res.json(response.accessDenied())
          return
        }
        const token = jwt.sign({ id: data.user_id }, SECRET_KEY, { expiresIn: '24h' })
        res.json(response.success({...data, token}))

      } else {
        res.json(response.authorizeFailed())
      }
    }
    return [
      validate(rules, 'body'),
      handler
    ]
  }

  findAll() {
    const rules = Joi.object({
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional()
    })

    const handler = async (req, res) => {
      const { page, size } = req.query
      const { status, message, result } = await userDAO.findAll(page, size)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }
    return [
      validate(rules),
      handler
    ]
  }

  disable() {
    const rules = Joi.object({
      id: Joi.string().required(),
      disable: Joi.number().required()
    })
    const handler = async (req, res) => {
      const { id, disable } = req.body
      const { status, message, result } = await userDAO.disable(id, disable)
      if(!status) return res.json(response.fail(message))
      res.json(response.success(result))
    }

    return [
      validate(rules, 'body'),
      handler
    ]
  }
}