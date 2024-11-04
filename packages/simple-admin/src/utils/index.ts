import { markRaw, defineAsyncComponent, type Component } from 'vue';
import { customAlphabet } from 'nanoid';
import type { Viewport } from '@/types/editor';
/**
 * 随机id生成
 * @param length 长度
 * @returns
 */
export const nanoid = (length = 8) => {
  const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', length);
  return nanoid();
};

/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

/**
 * 判断是否是移动端
 */
export const isMobileViewport = (value: Viewport) => {
  return value === 'mobile';
};

/**
 * 让短横线的字符串 每个首字母变成大写
 * @param str
 * @returns
 */
export const capitalizeWords = (str: string) => {
  return str
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

/**
 * 动态引入组件
 * @param name 组件名
 * @param importUrl 引入所有的组件 import.meta.glob('@/components/config/**')
 */

export const batchDynamicComponents = (
  name: string,
  importUrl: Record<string, Component>
) => {
  const components = importUrl; // /src/components/config/ConfigInput.vue: () => import("/src/components/config/ConfigInput.vue")
  console.log(components, '====>importUrl');
  const componentMap = Object.assign(
    {},
    ...Object.keys(components).map(item => {
      const name = item?.split('/')?.pop()?.replace('.vue', '') || '';
      return {
        [name]: components[item]
      };
    })
  );
  console.log(capitalizeWords(name), componentMap);
  const _name = capitalizeWords(name);
  const importComponent = componentMap[_name];
  if (!importComponent) return '';
  return markRaw(defineAsyncComponent(importComponent));
};
