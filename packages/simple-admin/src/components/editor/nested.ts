import { cloneDeep } from 'lodash';
import deepmerge from 'deepmerge';
import { nanoid } from '@/utils/index';
import type { IBaseBlock } from '@/types/editor';

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

/**
 * 找到相对应id里的FormData 做更新
 * @param arr
 * @param nodeId
 * @param data
 * @returns
 */
export const findNodeById = (
  arr: IBaseBlock[],
  nodeId: string,
  data: object
) => {
  const array = cloneDeep(arr);
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.id === nodeId)
      element.formData = deepmerge.all([element.formData, data]);
    return array;
  }
  return array;
};
