import { cloneDeep, isEqual } from 'lodash';
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
    const element = array[i] as any;
    if (element.id === nodeId) {
      const overwriteMerge = (sourceArray: any) => sourceArray;
      // 更新formData的值
      element.formData = deepmerge(element.formData, data, {
        arrayMerge: overwriteMerge
      });
      // 针对 列的组件 需要特殊处理
      if (element.nested && element.code === 'column') {
        const cols = element.formData?.cols?.desktop || [0.5, 0.5];
        const oldCols = element.children || [[], []];
        if (oldCols.length > cols.length) {
          // 判断如果列数 小于 原本的children长度，则代表是删除
          // 计算要删除的数目
          const count = oldCols.length - cols.length;
          element.children.splice(oldCols.length - count, count);
        } else {
          // 判断如果列数 大于 原本的children长度，则代表是新增
          // 计算要新增的数目
          const count = cols.length - oldCols.length;
          const diff = Array.from({ length: count }, () => []);
          element.children.push(...diff);
        }
      }
      return array;
    }

    if (element.children.length) {
      // 如果节点有子节点，则递归调用 findNodeById 函数
      for (let j = 0; j < element.children.length; j++) {
        const elementChildren = element.children[j];
        if (!elementChildren.length) continue;
        const newChildren = findNodeById(elementChildren, nodeId, data);
        if (!isEqual(newChildren, elementChildren)) {
          // 如果子节点数组有更新，则更新当前节点的子节点数组
          if (newChildren) {
            element.children[j] = newChildren;
          }
          return array;
        }
      }
    }
  }
  return array;
};
