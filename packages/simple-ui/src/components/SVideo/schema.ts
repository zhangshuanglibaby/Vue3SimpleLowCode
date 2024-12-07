// 这里是视频 物料的数据

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

const src = Type.String({
  code: 'config-video', // 这里是对应的 右侧配置的组件
  title: '视频',
  default: '',
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min:1,  message: "最少1个字符", trigger: "change" }]
})

const autoplay = Type.String({
  code: 'config-switch', // 这里是对应的 右侧配置的组件
  title: '自动播放',
  default: true
})

const muted = Type.String({
  code: 'config-switch', // 这里是对应的 右侧配置的组件
  title: '静音',
  default: true
})

const width = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '宽度',
  default: '100%',
  placeholder: '请输入宽度',
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min:1,  message: "最少1个字符", trigger: "change" }]
})

const height = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '高度',
  default: '295px',
  placeholder: '请输入高度',
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min:1,  message: "最少1个字符", trigger: "change" }]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  autoplay: schemaAllViewport(autoplay),
  muted: schemaAllViewport(muted),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height)
})

// schema 的类型
export type SVideoSchemaType = Static<typeof schema>

export default schema
