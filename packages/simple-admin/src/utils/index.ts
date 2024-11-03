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
