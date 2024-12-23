/**
 * 自动导入component下的vue文件，实现自动引入全局注册
 */
// import type { App } from 'vue'

const globalCom = () => {
  const comMap: { [key: string]: any } = {}
  const modules = import.meta.glob('@/components/*/index.vue', {
    eager: true
  })
  for (let each in modules) {
    // console.log(each, '========>each')
    const subName = each.replace(/\/src\/components\//, '')
    // console.log(subName, '====>subName')
    const name = subName.substring(0, subName.length - 10)
    // console.log(name, '====>name')
    comMap[name] = (modules[each] as any).default
    // Vue.component(name, (modules[each] as any).default)
  }
  return comMap
}

// const globalCom = {
//   install: async (Vue: App<Element>) => {
//     const modules = import.meta.glob('@/components/*/index.vue', {
//       eager: true
//     })
//     for (let each in modules) {
//       // console.log(each, '========>each')
//       const subName = each.replace(/\/src\/components\//, '')
//       // console.log(subName, '====>subName')
//       const name = subName.substring(0, subName.length - 10)
//       // console.log(name, '====>name')
//       Vue.component(name, (modules[each] as any).default)
//     }
//   }
// }
export default globalCom()
