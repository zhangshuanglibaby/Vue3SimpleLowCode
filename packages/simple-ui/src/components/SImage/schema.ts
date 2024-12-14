// 这里是图片 物料的数据
/**
 * 定义json schema的是结构 推荐使用typebox插件定义类型
 *
 * 假设图片物料需要定义的字段：
 * display 用于指定展示在哪些端(pc mobile)
 * src 图片地址
 * link 图片链接
 * width 图片宽
 * height 图片高
 * 每个字段 因为可能在pc端和移动端设置的值不同，因此每个字段里面都要包含{ desktop, mobile } 字段
 */

import { Type, type Static } from '@sinclair/typebox'
import { schemaAllViewport } from '@/utils/components'

// 这种写法太过于重复了
// const schema = Type.Object({
//   display: Type.Object({
//     desktop: Type.Boolean({
//       code: 'config-viewport', // 这里是对应的 右侧配置的组件
//       title: '屏幕',
//       default: ''
//     }),
//     mobile: Type.Boolean({
//       code: 'config-viewport', // 这里是对应的 右侧配置的组件
//       title: '屏幕',
//       default: ''
//     })
//   }),
//   src: Type.Object({
//     desktop: Type.String({
//       code: 'config-files', // 这里是对应的 右侧配置的组件
//       title: '图片',
//       default: ''
//     }),
//     mobile: Type.String({
//       code: 'config-files', // 这里是对应的 右侧配置的组件
//       title: '图片',
//       default: ''
//     })
//   }),
//   link: Type.Object({
//     desktop: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '链接',
//       default: ''
//     }),
//     mobile: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '链接',
//       default: ''
//     })
//   }),
//   width: Type.Object({
//     desktop: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '宽度',
//       default: ''
//     }),
//     mobile: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '宽度',
//       default: ''
//     })
//   }),
//   height: Type.Object({
//     desktop: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '高度',
//       default: ''
//     }),
//     mobile: Type.String({
//       code: 'config-input', // 这里是对应的 右侧配置的组件
//       title: '高度',
//       default: ''
//     })
//   })
// })

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
  code: 'config-files', // 这里是对应的 右侧配置的组件
  title: '图片',
  default: '',
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min:1,  message: "最少1个字符", trigger: "change" }]
})

const link = Type.String({
  code: 'config-input', // 这里是对应的 右侧配置的组件
  title: '链接',
  default: '',
  placeholder: '请输入链接',
  minLength: 1,
  errorMessage: {
    required: "最少1个字符",
    minLength: "最少1个字符"
  },
  rules: [{ required: true, min:1,  message: "最少1个字符", trigger: "change" }]
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

// 可以封装一个方法 再简化下写法
// const schema = Type.Object({
//   display: Type.Object({
//     desktop: display,
//     mobile: display
//   }),
//   src: Type.Object({
//     desktop: src,
//     mobile: src
//   }),
//   link: Type.Object({
//     desktop: link,
//     mobile: link
//   }),
//   width: Type.Object({
//     desktop: width,
//     mobile: width
//   }),
//   height: Type.Object({
//     desktop: height,
//     mobile: height
//   })
// })

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
  src: schemaAllViewport(src),
  link: schemaAllViewport(link),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height),
  top: schemaAllViewport(top),
  left: schemaAllViewport(left)
})

// schema 的类型
export type SImageSchemaType = Static<typeof schema>

export default schema
