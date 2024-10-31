// import icon from "@/config/icon";

// const { row, column, image, video, text, swiper, blank, canvas } = icon;

import type { BlockSchema, BlockSchemaKeys } from './schema';

export interface IBaseBlock {
  /**
   * 区分组件
   */
  id: string;
  /**
   * 渲染的组件
   */
  code: string;
  /**
   * 物料区标题
   */
  name: string;
  /**
   * 物料区图标
   */
  icon: string;
  /**
   * 是否是嵌套组件
   */
  nested?: boolean; // 是否可以嵌套标识
  /**
   * 嵌套子项
   */
  children?: IBaseBlock[][];
  /**
   * 配置的内容
   * 存储到数据库的配置,这里的数据其实应该是根据每个物料自己定义的schema中取的
   */
  formData: BlockSchema[BlockSchemaKeys] | object;
}

// 定义基础组件列表
export const baseBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'SImage',
    icon: 'image',
    formData: {}
  },
  {
    id: '',
    name: '视频',
    code: 'SVideo',
    icon: 'video',
    formData: {}
  },
  {
    id: '',
    name: '文本',
    code: 'SText',
    icon: 'text',
    formData: {}
  },
  {
    id: '',
    name: '幻灯片',
    code: 'SSwiper',
    icon: 'swiper',
    formData: {}
  },
  {
    id: '',
    name: '留白',
    code: 'SBlank',
    icon: 'blank',
    formData: {}
  }
];

// 定义高级组件
export const seniorBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '多行',
    code: 'SRow',
    icon: 'row',
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '多列',
    code: 'SColumn',
    icon: 'column',
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '画布',
    code: 'SCanvas',
    icon: 'canvas',
    nested: true,
    children: [[], []],
    formData: {}
  }
];

// 画布组件
export const canvasBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'SImage',
    icon: 'image',
    formData: {}
  },
  {
    id: '',
    name: '文本',
    code: 'SText',
    icon: 'text',
    formData: {}
  }
];
