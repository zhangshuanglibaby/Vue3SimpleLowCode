import type { BlockSchema, BlockSchemaKeys } from '@/config/schema';

export type Viewport = 'mobile' | 'desktop';

// 物料的类型
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
  formData: Partial<BlockSchema[BlockSchemaKeys]>;
  /**
   * 用于画布 记录父组件是不是canvas
   */
  parent?: string;
}

export type IBaseBlockOrNull = IBaseBlock | null;
