import './style.css'

import SImage from './components/s-image.vue'

import SImageSchema from '@/components/image/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'

// 导出物料的schema相关数据
export const schema = {
  image: SImageSchema
}
// 导出方法
export const schemaAllViewport = _schemaAllViewport
// 导出所有组件
export default {
  SImage
}
