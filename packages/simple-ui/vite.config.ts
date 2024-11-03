import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import defineOptions from 'unplugin-vue-define-options/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      // 指定tsconfig文件
      tsconfigPath: 'tsconfig.app.json'
    }),
    defineOptions()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'), // 设置入口文件
      name: 'simple',
      // 将添加适当的扩展名后缀
      fileName: 'simple'
    },
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖
        // 提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     // 配置mixin.scss 混合文件的全局引入
  //     scss: {
  //       additionalData: `@import "@/assets/styles/resources.scss";`
  //     }
  //   }
  // }
})
