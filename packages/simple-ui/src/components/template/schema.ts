import { Type, type Static } from '@sinclair/typebox'
import { schemaAllViewport } from '@/utils/components'

const src = Type.String({
  code: 'config-files', // 这里是对应的 右侧配置的组件
  title: '图片',
  default: ''
})

const schema = Type.Object({
  src: schemaAllViewport(src)
})

// schema 的类型
export type SImageSchemaType = Static<typeof schema>

export default schema
