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
  }
}
