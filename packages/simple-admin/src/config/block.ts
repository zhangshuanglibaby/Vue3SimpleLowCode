import type { IBaseBlock } from '@/types/editor';

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
