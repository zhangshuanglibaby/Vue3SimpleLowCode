import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type SColumnPropsDataType = {
  /**
   * 图片地址
   */
  src: ViewportType
}

export const props = {
  data: {
    type: Object as PropType<SColumnPropsDataType>,
    default: () => ({
      src: {
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
