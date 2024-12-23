import './style.css'

import '@/assets/styles/index.scss'
import type { App } from 'vue'
// import SImage from './components/image/index.vue'
import globalCom from './components'
import SImageSchema from '@/components/SImage/schema'
import SColumnSchema from '@/components/SColumn/schema'
import STextSchema from '@/components/SText/schema'
import SRowSchema from '@/components/SRow/schema'
import SVideo from '@/components/SVideo/schema'
import SCanvas from '@/components/SCanvas/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from '@/config/index'

// 导出物料的schema相关数据
export const schema = {
  image: SImageSchema,
  column: SColumnSchema,
  text: STextSchema,
  row: SRowSchema,
  video: SVideo,
  canvas: SCanvas
}

// const globalComponents = [SImage]
// const install = (app: App) => {
//   globalComponents.forEach(component => {
//     console.log(component, '=====>component')
//     const { name } = component
//     console.log(name, '====>name')
//     if (name) app.component(name, component)
//   })
// }
const install = (app: App, options: { platform: 'editor' | 'user' }) => {
  Object.keys(globalCom).forEach(name => {
    app.component(name, globalCom[name])
  })
  app.provide('platform', options.platform)
}
// 导出方法
export const schemaAllViewport = _schemaAllViewport
// 导出前缀
export const COMPONENT_PREFIX = _COMPONENT_PREFIX
// 导出所有组件
export default { install }
