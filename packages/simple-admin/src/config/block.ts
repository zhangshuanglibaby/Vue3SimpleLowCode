import type { IBaseBlock } from '@/types/editor';

// 定义基础组件列表
export const baseBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: 'image',
    formData: {}
  },
  {
    id: '',
    name: '视频',
    code: 'video',
    icon: 'video',
    formData: {}
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: 'text',
    formData: {}
  },
  {
    id: '',
    name: '幻灯片',
    code: 'swiper',
    icon: 'swiper',
    formData: {}
  },
  {
    id: '',
    name: '留白',
    code: 'blank',
    icon: 'blank',
    formData: {}
  }
];

// 定义高级组件
export const seniorBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '多行',
    code: 'row',
    icon: 'row',
    nested: true,
    children: [[]],
    formData: {}
  },
  {
    id: '',
    name: '多列',
    code: 'column',
    icon: 'column',
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '画布',
    code: 'canvas',
    icon: 'canvas',
    nested: true,
    children: [[]],
    formData: {}
  }
];

// 画布组件
export const canvasBlocks: IBaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: 'image',
    formData: {},
    parent: 'canvas' // 记录父级是不是canvas
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: 'text',
    formData: {},
    parent: 'canvas'
  }
];
