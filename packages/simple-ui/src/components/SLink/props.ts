import type { PropType } from 'vue'

export type SLinkPropsTargetType = '_blank' | '_self' | '_parent' | '_top'
export const props = {
  /**
   * 链接
   */
  to: {
    type: String,
    default: ''
  },
  /**
   * 跳转方式
   */
  target: {
    type: String as PropType<SLinkPropsTargetType>,
    default: '_blank'
  }
}
