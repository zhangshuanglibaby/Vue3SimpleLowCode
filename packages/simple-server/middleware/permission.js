import { response } from "../utils/response.js"
import { userDAO } from "../dao/index.js"
export const permissionHandler = (roleId = 10) => {
  return async (req,res, next) => {
    console.log(req.name, req.message, "====>params")
    const { id } = req.auth
    if(!id) {
      res.json(response.fail('missing id'))
      return
    }

    const { status, message, result } = await userDAO.findOne(id)

    if(!status) return res.json(response.fail(message))

    const [ data ] = result

    // 简单机遇角色id做权限
    if(data && data.role_id === roleId) {
      next()
    }else {
      res.json(response.accessDenied())
    }
}
}