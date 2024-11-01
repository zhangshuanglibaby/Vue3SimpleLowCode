import { defineStore } from 'pinia';
import type { Viewport, IBaseBlockOrNull } from '@/types/editor';

export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      currentSelect: null as IBaseBlockOrNull, // 当前选中的组件
      viewport: 'desktop' as Viewport // 记录当前的端
    };
  },
  actions: {
    setCurrentSelect (value: IBaseBlockOrNull) {
      this.currentSelect = value;
    },

    setViewport (value: Viewport) {
      this.viewport = value;
    }
  }
});
