import { Type, type Static } from '@sinclair/typebox'
import { schemaAllViewport } from '@/utils/components'

const cols = Type.Array(Type.Number(), {
  code: 'config-column', // 这里是对应的 右侧配置的组件
  title: '列数',
  default: 0.5,
  minItems: 2,
  maxItems: 4
})

const background = Type.String({
  code: 'config-color', // 这里是对应的 右侧配置的组件
  title: '背景',
  default: ''
})

const schema = Type.Object({
  cols: schemaAllViewport(cols),
  background: schemaAllViewport(background)
})

// schema 的类型
export type SColumnSchemaType = Static<typeof schema>

export default schema
