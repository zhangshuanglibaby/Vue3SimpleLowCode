import { cloneDeep } from 'lodash';
import { nanoid } from '@/utils/index';

/**
 * column嵌套class
 * 用来move里判断是否可以嵌套
 */
export const nestedClass = 'nested-container';

/**
 * 多个draggable 组件的group 名
 * 相同名可以相互拖拽
 */
export const dragGroup = 'blocks';

/**
 * draggable移动事件
 * 判断是否可以拖入
 */
export const move = (e: any) => {
  const classList = Array.from(e?.to?.classList);
  const isRelateNested = classList?.includes(nestedClass);
  if (e.draggedContext?.element?.nested && isRelateNested) return false;
  return true;
};

/**
 * 深拷贝
 */
export const clone = (e: object) => {
  return cloneDeep({ ...e, id: nanoid(8) });
};
