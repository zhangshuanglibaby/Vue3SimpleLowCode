import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type SCanvasPropsDataType = {
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

  /**
   * 高度
   */
  height: ViewportType
}

export type SCanvasPropsList = any[][]

export const props = {
  data: {
    type: Object as PropType<SCanvasPropsDataType>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      background: {
        desktop: '',
        mobile: ''
      },
      height: {
        desktop: '',
        mobile: ''
      }
    })
  },
  children: {
    type: Array as PropType<SCanvasPropsList>,
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
