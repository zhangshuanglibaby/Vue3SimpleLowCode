import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type SImagePropsDataType = {
  /**
   * 展示屏幕
   */
  display: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 图片地址
   */
  src: ViewportType
  /**
   * 图片链接
   */
  link: ViewportType
  /**
   * 图片宽度
   */
  width: ViewportType
  /**
   * 图片高度
   */
  height: ViewportType
  /**
   * 图片居上
   */
  top?: ViewportType
  /**
   * 图片居左
   */
  left?: ViewportType
}

export const props = {
  data: {
    type: Object as PropType<SImagePropsDataType>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      src: {
        desktop: '',
        mobile: ''
      },
      link: {
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
