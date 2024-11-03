/**
 * 多列组件的props
 */
import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

interface ViewportType<T> {
  desktop: T
  mobile: T
}
export type SColumnPropsDataType = {
  /**
   * 列数
   * 用数组表示 如[0.5, 0.5] 表示两列 各50%宽，[0.3, 0.3, 0.4] 表示3列，两列30%宽度，一列40%宽度
   */
  cols?: ViewportType<number[]>
  /**
   * 背景色
   */
  background: ViewportType<string>
}

export const props = {
  data: {
    type: Object as PropType<SColumnPropsDataType>,
    default: () => ({
      cols: {
        desktop: [0.5, 0.5],
        mobile: [0.5, 0.5]
      },
      background: {
        desktop: '',
        mobile: ''
      }
    })
  },
  // 子级
  children: {
    type: Object as PropType<ViewportType<any[][]>>,
    default: () => ({
      desktop: [[], []],
      mobile: [[], []]
    })
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator (val: string) {
      // 校验viewport的值正不正确
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
