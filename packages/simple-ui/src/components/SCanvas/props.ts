import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type SRowPropsDataType = {
  /**
   * 展示屏幕
   */
  display: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 背景
   */
  background: ViewportType
}

export type SRowPropsList = any[][]

export const props = {
  data: {
    type: Object as PropType<SRowPropsDataType>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      background: {
        desktop: '',
        mobile: ''
      }
    })
  },
  children: {
    type: Array as PropType<SRowPropsList>,
    default: () => [[]]
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
