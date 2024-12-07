import { logDAO } from "../dao/index.js"

export const operateLogHandler = (req, res, next) => {
  const obj = {
    user_id: req.auth.id,
    url: req.route.path,
    url_unique: req.body.id,
    body: JSON.stringify(req.body)
  }

  // 记录操作
  logDAO.create(obj)
}