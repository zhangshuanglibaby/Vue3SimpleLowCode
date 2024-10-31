import { schema } from '@simple/ui';

// 导出schema类型
export type BlockSchema = typeof schema;
export type BlockSchemaKeys = keyof BlockSchema;

// 所有物料的schema的数据
export const blockSchema = schema;
