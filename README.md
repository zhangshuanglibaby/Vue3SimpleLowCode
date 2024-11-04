monorepo是一种项目代码管理方式，指单个仓库中管理多个项目

- 1.目录搭建
  - 使用pnpm init
  - 需要在根目录创建一个packages 目录
    - 新建simple-ui组件库项目、simple-preview预览项目、simple-admin后台项目
    - 新建simple-ui组件库项目因为是一个库，可以参照vite 文档-库模式，在vite.config.ts中填写相关的lib配置
    - simple-ui组件库的package.json需要设置导出的配置
    - simple-preview预览项目 需要安装 simple-ui组件库依赖: pnpm -F @simple/preview add @simple/ui
  - 需要在根目录新建一个pnpm-workspace.yaml的文件
- 2.编写常用的脚本命令
  - simple项目:想要安装monorepo里面所有项目里面的包（想要在最外层的项目一次性安装）执行：pnpm i -r
  - simple项目: 想解决每次要手动删除每个项目的依赖包，可以安装rimraf： pnpm add -D rimraf
    rimraf是nodejs的模块，提供了删除文件和文件夹的方法，可以直接使用rimraf命令删除文件或文件夹
    - simple项目: 在package.json的标本中，新增删除指令
  - 在测试时，既要打包simple-ui的文件，又要启动预览环境，每次都要手动去执行不同项目的命令有点麻烦，可以在最外层的simple的项目中封装一些命令
    - 解决在simple-ui中每次打包时都手动需要清除dist包
      - 安装rimraf: pnpm add rimraf
      - 新增clear命令 "clear": "rimraf dist ./node_modules"
      - 新增clear:dist命令 "clear:dist": "rimraf dist"
      - 更改build的命令 "build": "pnpm clear:dist && ... "
    - 解决每次都要进入到某个文件夹里面执行命令的问题，在simple最外层的文件夹的package.json中，写入常用的命令
      - simple-preview预览的界面，是先需要打包simple-ui项目，再运行项目: "preview": "pnpm -F @simple/ui build && pnpm -F @simple/preview dev"
      - 预览simple-ui项目："ui": "pnpm -F @simple/ui dev"
      - 打包simple-ui项目："ui:build": "pnpm -F @simple/ui build"
      - 想要安装monorepo里面所有项目里面的包： "in": "pnpm i -r"
      - preinstall，在你安装项目之前会做一些提示，比如只能允许使用pnpm: "preinstall": "npx only-allow pnpm"

组件库是不需要包含宿主依赖的，因为只是在开发中需要用到vue的依赖，但是打包构建后是不需要的，因为在引用组件库的宿主环境中已经有vue了，因此不需要把vue单独的打包到组件库中，反倒还会增加组件库的体积包 - 在simple-ui项目中,vite.config.ts -> build中配置rollupOptions -> external

- 在渲染自定义组件的时候，有可能会存在样式污染的可能性，防止样式污染的方式：
  - 1.早期为了降低名称命名的冲突问题，发明了BEM命名法 B(Block)，E(Element)、M(Modifier)
  - 2.vue 的 作用域 scope
  - 3.影子DOM，比如video的控制图标用的就是shadow dom
  - 4.iframe，但是通信比较麻烦

解决组件库样式被污染的问题，比如污染场景：如果在组件库中写了重置样式rest,但是宿主环境的重置样式会和组件库的重置样式会起冲突，一般重置的样式也不会写在scope里面

- 采用vue的作用域 scope
- 组件库的公共样式加上独有的class特缀

  - 组件库的重置样式在最外层新增一个特定类名，缺点：每次编写组件时需要都需要携带这个特定类名，可以统一的去加上这个特定class

- 平台的项目搭建

  - 在packages新建simple-admin项目
  - simple-admin项目安装element-plus依赖
    - element-plus采用按需导入 -> 自动导入方式
    - 在vite.config.ts中新增自动导入的配置
    - 利用unplugin-vue-components这个插件，可以给设置一个文件夹，让里面的vue文件自动导入到全局，比如让components文件下的文件自动导入
  - simple-admin项目的代码规范 eslint, prettier
    - vscode安装ESLint, Prettier - Code formatter 这两个插件
    - 其实eslint和prettier的作用其实是有点相似的，因为eslint和prettier都有代码格式化的功能，因此vue在eslint包中引入了@vue/eslint-config-prettier这个插件，是解决当和Prettier的格式冲突时，跳过次规则
    - 虽然eslint和prettier功能有点相似，但是在vue中eslint更多被用作代码质量检测的功能，prettier用于代码格式化的功能
  - 项目 git规范，会用到的工具：友好的类型提示工具-commitizen、cz-vinyl(命名规范) commit-message检查工具：husky(git hook工具)、commitlint
    - 在最外层项目simple安装关于git的工具
    - husky，是git hook工具，可以操作git在各个生命周期中做的操作，比如提交代码前，提交代码中，提交代码后，都可以做相应的一些操作
      - 安装husky: pnpm add --save-dev husky - 初始化husky设置： pnpm exec husky init，执行完会多出一个.husky的文件夹
      - git提交前需要做规范的操作
        - 需要在husky的pre-commit写提交前的检测脚本,husky在提交前执行lint-staged
        - 安装lint-staged插件: pnpm add --save-dev lint-staged，这个插件是可以在一些错误在提交前被发现，比如有些同事在开发的时候把eslint关掉了，就导致写的代码可能存在问题，那么在提交前，如果在项目中安装了lint-staged插件，会在提交前在检测一次你的代码有没有eslint的问题
        - 在husky的pre-commit写提交前的检测脚本: pnpm exec lint-staged
        - 在package.json中做一些lint-staged相关配置
        - 这里要注意，因为不是每个项目都有eslint规范，而且每个规范的支持度也不一样，因此要特别设置 规范这里的脚本配置
        - 使用zx包，可以很方便的编写命令脚本： pnpm add -D zx，在最外层新建一个script文件夹
      - git提交中的需要做规范的操作，命名的规范，一般会使用cz-vinyl 和 commitizen 搭配, 可以使提交的记录保持良好的规范
        - 安装cz-vinyl工具： pnpm add --save-dev cz-vinyl
          - 需要在package.json加入相应的配置
        - 安装commitizen: pnpm add --save-dev commitizen
        - 新建.czvinylrc文件，可以自定义提交的类型配置
      - git提交后的需要做规范的操作，（提交信息编写完之后也要检测是否是标准的提交内容）- 安装commitlint，会检测这个提交的commit是否是规范的： pnpm add --save-dev @commitlint/{cli,config-conventional} - 再依次去执行以下两行命令：
        echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
        echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
        以上就是git的规范流程了，执行完后，就可以通过git cz去提交内容了
  - simple-admin项目的样式处理，使用sass预处理器
    - 安装sass: pnpm add -D sass
    - 开始建立sass基础规范
      - 新建/assets/styles
        - 新建/assets/styles/base(基础)：/assets/styles/base/\_animate.scss(基础动画)、/assets/styles/base/reset.scss(重置样式)
        - 新建/assets/styles/mixins(公用混入)：/assets/styles/mixins/\_index.scss
        - 新建/assets/styles/variables(变量)：/assets/styles/mixins/\_color.scss(公用颜色)
      - 新建/assets/main.scss，用来引入上述所有的scss文件
  - simple-ui组件库项目需要测试，安装Vitest
    - 安装Vitest
      - 在package.json中配置相关vitest配置
  - simple-ui组件库项目引入tailwindcss
    - 安装tailwindcss： pnpm add -D tailwindcss postcss autoprefixer
    - 初始化tailwindcss的配置
    - 此时运行的时候会发现爆PostCSS的错误，可以修改postcss.config.js为postcss.config.cjs
    - 解决相对容器(比如div)做响应式处理的问题，可以使得这个媒体查询是相对于容器，而不是屏幕
      - 因为媒体查询是基于屏幕的，我们的simple-ui组件库的场景：一种是用在低代码的后台，一种是用在前台；用在前台其实就是相对于屏幕，
        在低代码平台的渲染区的组件库是相对于盒子容器做响应式的
    - 解决tailwindcss因为要做响应式处理，导致一个属性，要重复写几遍，要写很多的class
    - container-type 容器查询
    - Mobile端/PC端组件样式兼容封装
      - simple-ui项目安装sass： pnpm add -D sass
      - simple-ui/assets/styles新增：block(物料)、functions、mixins、reset、index
      - simple-ui/assets/styles/reset.scss，注意要在最外层包一个特殊类名，防止和宿主环境的重置样式发生冲突
      - simple-ui/assets/styles/mixins.scss,主要写媒体查询相关的东西，我们定<1024的为移动端，>1024为pc端
        - 注意我们的查询分为：媒体查询，容器查询
      - 借助vscode添加一些常用的代码片段

- simple-admin低代码编辑器的整体结构
  - views新建editor编辑页、list列表页
  - 在router中更改为哈西路由模式，引入这两个页面
  - 在最外层项目simple新增启动simple-admin的脚本
  - 在vscode增加autoscssstruct4vue插件，根据结构一键生成类名
  - 图标使用yesicon/fluent: https://yesicon.app/
    - 新建/src/config/icon.ts文件
    - 安装 @iconify/vue依赖: pnpm add --save-dev @iconify/vue
    - 在main.ts中引入并全局注册icon组件
  - 新建/components/base 放置基础组件
  - 新建/components/base/v-icon组件，放置特殊的icon内容
  - 新建src/types放置类型文件
- simple-admin的编辑页面
  - 在views/editor页面中会分很多组件
    - 在components新增editor文件夹: editor-header、editor-block、editor-render、editor-config
  - 开始编写views/editor页面左侧物料区
  - 新建editor-block-drag可以拖拽的组件
  - 编写editor-block组件左侧物料区
  - 新增config/block.ts存放每个物料的配置，如icon、标题、schema，要渲染的组件，可嵌套的标识
  - 注意：config/block.ts下的 每个物料的formData的数据是从 simple-ui中每个组件的schema中来的
  - 定义json schema的类型 推荐使用typebox依赖，比较方便给结构赋予类型，并且使用的时候会有提示
  - 因为在simple-ui 和 simple-admin 项目都要使用json schema，因此这两个都安装typebox依赖
  - 安装typebox: pnpm add @sinclair/typebox --save
  - simple-ui 的图片物料定义schema整体大致结构 - simple-ui 的图片物料schema数据导出出去
  - simple-ui 项目打包时，会发现没有ts声明文件，导致宿主环境没法引用
  - 通过安装vite-plugin-dts，pnpm add vite-plugin-dts -D,可以导出ts声明文件
  - 在package.json中导出声明文件路径 - simple-admin 项目安装 simple-ui 库
  - simple-admin 新建 config/schema.ts文件，管理所有的schema数据
  - simple-admin 开始编写/components/editor/EditorBlockDrag的内容
  - simple-admin 新建/components/editor/nested.ts文件，编写nested相关的操作 - 需要用到深拷贝，安装lodash - 安装nanoid库，可随机生成id
  - simple-admin 安装vuedraggable插件：pnpm add -S vuedraggable@next，并在main.ts中注册
  - 开始编写views/editor页面中间的渲染区
    - 渲染区的一些数据需要记录到状态管理中
  - simple-ui项目，要实现注册全局组件插件
  - simple-ui项目，实现一个图片的props完整的写法
  - simple-ui项目，编写一个命名class前缀的mixins
  - simple-ui项目,创建跳转组件SLink，用来解决在业务端展示需要跳转的组件
  - simple-ui项目,创建空组件SEmpty，用来解决物料配置空的时候 展示的内容
  - 开发simple-ui项目,整理一个物料模版
  - 开发simple-ui项目,的多列组件
    - 多列组件是个容器组件，在组件库的视觉中，他其实内部是一个插槽
    - 多列组件是个容器组件，在后台的编辑器的视觉中，它放入的还是一个拖拽的盒子
  - 开发simple-admin项目中编辑器的嵌套拖拽
    - 嵌套拖拽其实和简单拖拽差不多，但需要有一些标识来判定当前是否可拖拽的
  - 开发simple-admin项目中编辑器的配置区 容器
    - 这个配置区的容器 会在状态管理有个变量控制 是否显示 和 隐藏
  - 开发simple-admin项目中编辑器的 输入框组件
    - 新建src/components/config文件夹，专门放配置组件
  - 处理simple-admin项目中编辑器的 右侧配置区的数据通信
  - 开发simple-admin项目 多端切换
  - 开发simple-admin项目 配置区 组件 简易版图片选择
  - 开发simple-admin 项目 配置区 页面容器

解决每次更改simple-ui库的代码时，都要手动的去重新打包 宿主环境才能更新依赖

问题：

1. 插件引入vue的版本问题
2. vue3引入样式的问题，在simple-ui项目的样式使用scope，以及在vue3的预览项目中使用scope，会导致预览vue3项目中simple-ui的组件样式失效
3. 渲染区的组件样式污染问题
4. 解决因为媒体查询是基于屏幕的，我们的simple-ui组件库的场景：一种是用在低代码的后台，一种是用在前台；用在前台其实就是相对于屏幕，
   在低代码平台的渲染区的组件库是相对于盒子容器做响应式的
5. 解决每次更改simple-ui库的代码时，都要手动的去重新打包 宿主环境才能更新依赖
6. 解决simple-ui 的每个组件 的样式前缀问题
7. 因为组件在业务端展示时，有可能会存在点击跳转的逻辑，通过封装一个跳转组件，用跳转组件把物料组件装进去
8. 没解决sass 全局引入的问题
