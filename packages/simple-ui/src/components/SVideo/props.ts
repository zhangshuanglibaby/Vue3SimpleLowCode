import type { PropType } from 'vue'
import type { ComponentViewport } from '@/types/component'

type ViewportType = {
  desktop: string
  mobile: string
}
export type SVideoPropsDataType = {
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
   * 自动播放
   */
  autoplay: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 静音
   */
  muted: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 图片宽度
   */
  width: ViewportType
  /**
   * 图片高度
   */
  height: ViewportType
}

export const props = {
  data: {
    type: Object as PropType<SVideoPropsDataType>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      src: {
        desktop: '',
        mobile: ''
      },
      autoplay: {
        desktop: true,
        mobile: true
      },
      muted: {
        desktop: true,
        mobile: true
      },
      width: {
        desktop: '',
        mobile: ''
      },
      height: {
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
