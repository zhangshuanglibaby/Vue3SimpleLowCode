import { defineStore } from 'pinia';
import type { Viewport, IBaseBlockOrNull, IBaseBlock } from '@/types/editor';
import type { PageSchemaFormData } from '@/config/schema';

export const useEditorStore = defineStore('editor', {
  state: () => {
    return {
      currentSelect: null as IBaseBlockOrNull, // 当前选中的组件
      blockConfig: [] as IBaseBlock[], // 存储右侧配置区的所有内容
      pageConfig: {} as PageSchemaFormData, // 存储右侧配置区页面容器配置
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
    setBlockConfig (value: IBaseBlock[]) {
      this.blockConfig = value;
    },
    setPageConfig (value: PageSchemaFormData) {
      this.pageConfig = value;
    },
    setViewport (value: Viewport) {
      this.viewport = value;
    },
    setConfigPanelShow (value: boolean) {
      this.configPanelShow = value;
    }
  }
});
