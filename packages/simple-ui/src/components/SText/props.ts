import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type STextPropsDataType = {
  /**
   * 展示屏幕
   */
  display: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 文本
   */
  text: ViewportType

  /**
   * 宽度
   */
  width: ViewportType
  /**
   * 高度
   */
  height: ViewportType
  /**
   * 居上
   */
  top?: ViewportType
  /**
   * 居左
   */
  left?: ViewportType
}

export const props = {
  data: {
    type: Object as PropType<STextPropsDataType>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      text: {
        desktop: '',
        mobile: ''
      },
      width: {
        desktop: '',
        mobile: ''
      },
      height: {
        desktop: '',
        mobile: ''
      },
      top: {
        desktop: '',
        mobile: ''
      },
      left: {
        desktop: '',
        mobile: ''
      }
    })
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator (val: string) {
      // 校验viewport的值正不正确
      return ['desktop', 'mobile'].includes(val)
    }
  },
  parent: {
    type: String,
    default: ''
  }
}
