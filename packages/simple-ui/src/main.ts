import './style.css'

import type { App } from 'vue'
// import SImage from './components/image/index.vue'
import globalCom from './components'
import SImageSchema from '@/components/SImage/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'

// 导出物料的schema相关数据
export const schema = {
  image: SImageSchema
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
// 导出方法
export const schemaAllViewport = _schemaAllViewport
// 导出所有组件
export default {
  install: globalCom.install
}
