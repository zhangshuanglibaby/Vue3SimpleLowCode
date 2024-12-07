import express from "express"
import cors from "cors"
import 'express-async-errors'
import { expressjwt } from "express-jwt"

import { error404Handler, errorHandler } from "./middleware/error.js"
import  { authFailedHandler }  from "./middleware/auth.js"
import { pageController, userController, packageController, logController, mediaController } from "./controller/index.js"
import { SECRET_KEY } from "./config/index.js"
import { permissionHandler } from "./middleware/permission.js"

const app = express()
const port = 8081

app.use(cors())
app.use(express.json()) // 兼容post请求的 json数据
app.use(express.urlencoded({ extended: true })) // 能解析出body
app.use(
  expressjwt({ secret: SECRET_KEY, algorithms: ['HS256']}).unless({ 
    path: ['/rest/v1/user/register','/rest/v1/user/login'] 
  })
) // unless可以指定白名单

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// 页面
app.get('/rest/v1/page',pageController.findAll())
app.get('/rest/v1/page/:id',pageController.findOne())
app.post('/rest/v1/page/create',pageController.create())
app.post('/rest/v1/page/delete',[permissionHandler(20)],pageController.remove())
app.post('/rest/v1/page/update',pageController.update())

// 用户
app.post('/rest/v1/user/register', userController.register())
app.post('/rest/v1/user/login', userController.login())
app.get('/rest/v1/user', userController.findAll())
app.post('/rest/v1/user/disable', userController.disable())

// 套件管理
app.get('/rest/v1/package',packageController.findAll())
app.get('/rest/v1/package/:id',packageController.findOne())
app.post('/rest/v1/package/create',packageController.create())
app.post('/rest/v1/package/delete',[permissionHandler(20)],packageController.remove())
app.post('/rest/v1/package/update',packageController.update())

// 日志
app.get('/rest/v1/log',logController.findAll())

// 媒体上传
app.post('/rest/v1/media/upload',mediaController.upload())

// 鉴权
app.use(authFailedHandler)

// 捕获全局错误
app.use(errorHandler)

// 捕获全局的路由
app.use('*', error404Handler)