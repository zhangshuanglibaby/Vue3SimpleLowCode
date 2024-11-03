import { defineStore } from 'pinia';
import type { Viewport, IBaseBlockOrNull } from '@/types/editor';

export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      currentSelect: null as IBaseBlockOrNull, // 当前选中的组件
      viewport: 'desktop' as Viewport, // 记录当前的端
      configPanelShow: false // 控制配置区的显示和隐藏
    };
  },
  getters: {
    isMobileViewport: state => state.viewport === 'mobile'
  },
  actions: {
    setCurrentSelect (value: IBaseBlockOrNull) {
      this.currentSelect = value;
    },

    setViewport (value: Viewport) {
      this.viewport = value;
    },
    setConfigPanelShow (value: boolean) {
      this.configPanelShow = value;
    }
  }
});
