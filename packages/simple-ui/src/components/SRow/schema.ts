
import { Type, type Static } from '@sinclair/typebox'
import { schemaAllViewport } from '@/utils/components'

// 经过简化
const display = Type.Boolean({
  code: 'config-viewport', // 这里是对应的 右侧配置的组件
  title: '屏幕',
  default: true,
  errorMessage: {
    required: "选择一项即可"
  },
  rules: [{ required: true, message: "选择一项即可", trigger: "change" }]
})

const background = Type.String({
  code: 'config-color', // 这里是对应的 右侧配置的组件
  title: '背景',
  default: ''
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  background: schemaAllViewport(background)
})

// schema 的类型
export type SRowSchemaType = Static<typeof schema>

export default schema
