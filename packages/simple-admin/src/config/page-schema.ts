/**
 * 页面容器的schema
 */

import { Type, type Static } from '@sinclair/typebox';
import { schemaAllViewport } from '@simple/ui';

const text = Type.String({
  code: 'config-text',
  title: '富文本',
  defaultValue: ''
});

const background = Type.String({
  code: 'config-color',
  title: '背景',
  defaultValue: ''
});

const title = Type.String({
  code: 'config-input',
  title: '标题',
  placeholder: '请输入页面标题'
});

const keywords = Type.String({
  code: 'config-input',
  title: '关键字',
  placeholder: '请输入页面关键字'
});

const description = Type.String({
  code: 'config-input',
  title: '描述',
  placeholder: '请输入页面描述'
});

const T = Type.Object({
  text: schemaAllViewport(text),
  background: schemaAllViewport(background),
  title: schemaAllViewport(title),
  keywords: schemaAllViewport(keywords),
  description: schemaAllViewport(description)
});

export type PageSchemaType = Static<typeof T>;

export default T;
