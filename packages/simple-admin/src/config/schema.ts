import { schema } from '@simple/ui';
import _pageSchema, { type PageSchemaType } from './page-schema';

// 导出schema类型
export type BlockSchema = typeof schema;
export type BlockSchemaKeys = keyof BlockSchema;

// 导出页面容器的schema类型
export type PageSchemaFormData = PageSchemaType;

// 所有物料的schema的数据
export const blockSchema = schema;
// 导出页面容器的schema的数据
export const pageSchema = _pageSchema;
