import { Type, type TSchema } from '@sinclair/typebox'
/**
 * 每个物料定义schema的加上视口
 */
export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params
  })
}
/**
 * 创建命名空间，包含组件名和公共class
 * @param prefix 公共前缀
 * @returns
 */
export const createNameSpaceFn = (prefix: string) => {
  return (name: string) => {
    // 我的组件名是 s-image s-video 这样的格式
    // const name = _name.charAt(0).toUpperCase() + _name.slice(1);
    const componentName = `${prefix}-${name}`

    // 组件可能会有不同的状态 比如失败的 选中的状态 会存在需要根据不同的状态返回不同的class，可以创建一个BEM class
    // 比如 s-image --disable
    const createBEM = (suffix?: string) => {
      if (!suffix) return componentName
      return suffix.startsWith('--')
        ? `${componentName}${suffix}`
        : `${componentName}__${suffix}`
    }
    return {
      name: componentName,
      n: createBEM
    }
  }
}
export const createNameSpace = createNameSpaceFn('s')
