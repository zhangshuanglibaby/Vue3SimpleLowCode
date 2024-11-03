import { Type, type Static } from '@sinclair/typebox'
import { schemaAllViewport } from '@/utils/components'

// 经过简化
const display = Type.Boolean({
  code: 'config-viewport', // 这里是对应的 右侧配置的组件
  title: '屏幕',
  default: true
})

const src = Type.String({
  code: 'config-files', // 这里是对应的 右侧配置的组件
  title: '图片',
  default: ''
})

const link = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '链接',
  default: '',
  placeholder: '请输入链接'
})

const width = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '宽度',
  default: '100%',
  placeholder: '请输入宽度'
})

const height = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '高度',
  default: '295px',
  placeholder: '请输入高度'
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  link: schemaAllViewport(link),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height)
})

// schema 的类型
export type SImageSchemaType = Static<typeof schema>

export default schema
