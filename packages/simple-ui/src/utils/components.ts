import { Type, type TSchema } from '@sinclair/typebox'
/**
 * 处理每个物料定义schema的类型
 */
export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params
  })
}
