
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

const text = Type.String({
  code: 'config-text', // 这里是对应的 右侧配置的组件
  title: '文本',
  default: ''
})

const width = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '宽度',
  default: '200px',
  placeholder: '请输入宽度',
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1,  message: "最少1个字符", trigger: "change" }],
  inCanvas: true
})

const height = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '高度',
  default: '50px',
  placeholder: '请输入高度',
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1,  message: "最少1个字符", trigger: "change" }],
  inCanvas: true
})

const top = Type.String({
  code: 'config-input',
  title: '居上',
  default: '0px',
  placeholder: '请输入居上位置',
  inCanvas: true
})

const left = Type.String({
  code: 'config-input',
  title: '居左',
  default: '0px',
  placeholder: '请输入居左位置',
  inCanvas: true
})


const schema = Type.Object({
  display: schemaAllViewport(display),
  text: schemaAllViewport(text),
  width: Type.Optional(schemaAllViewport(width)),
  height: Type.Optional(schemaAllViewport(height)),
  top: Type.Optional(schemaAllViewport(top)),
  left: Type.Optional(schemaAllViewport(left))
})

// schema 的类型
export type STextSchemaType = Static<typeof schema>

export default schema
