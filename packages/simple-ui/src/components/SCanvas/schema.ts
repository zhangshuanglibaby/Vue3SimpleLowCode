
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

const height = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '高度',
  default: '350px',
  placeholder: "请输入高度",
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min: 1, message: "最少1个字符", trigger: "change" }]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  background: schemaAllViewport(background),
  height: schemaAllViewport(height)
})

// schema 的类型
export type SCanvasSchemaType = Static<typeof schema>

export default schema
