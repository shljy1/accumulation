# accumulation

一个基于 Vue 3 + TypeScript + Vite 构建的现代化后台管理系统演示项目，集成了 3D 可视化、图表展示、丰富的 UI 组件和样式效果。

## 技术栈

| 技术                                          | 版本    | 说明                            |
| --------------------------------------------- | ------- | ------------------------------- |
| [Vue](https://vuejs.org/)                     | 3.4.x   | 渐进式 JavaScript 框架          |
| [TypeScript](https://www.typescriptlang.org/) | 5.5.x   | JavaScript 的超集，提供类型安全 |
| [Vite](https://vitejs.dev/)                   | 5.4.x   | 下一代前端构建工具              |
| [Pinia](https://pinia.vuejs.org/)             | 2.2.x   | Vue 官方状态管理库              |
| [Vue Router](https://router.vuejs.org/)       | 4.4.x   | Vue.js 官方路由                 |
| [Element Plus](https://element-plus.org/)     | 2.8.x   | 基于 Vue 3 的组件库             |
| [TailwindCSS](https://tailwindcss.com/)       | 3.4.x   | 实用优先的 CSS 框架             |
| [Three.js](https://threejs.org/)              | 0.172.x | 3D 图形库                       |
| [TresJS](https://tresjs.org/)                 | 4.3.x   | Vue 3 的 Three.js 封装          |
| [ECharts](https://echarts.apache.org/)        | 5.5.x   | 开源可视化图表库                |

## 功能特性

### 3D 可视化

- 汽车模型展示
- 角色模型展示
- 镜像效果
- 溶解效果
- 六芒星动画
- 卡通渲染
- 测量工具

### Canvas 动画

- 倒计时效果
- 字符雨动画
- 验证码生成

### 图表展示

- 仪表盘图表
- 象形图

### UI 组件

- 表格（表单表格、测试表格）
- 可编辑树组件

### CSS 样式效果

- 卡片翻转效果
- 抽屉照片效果
- 玻璃拟态卡片
- 悬停动画效果
- 旋转动画
- 加载动画

### 系统功能

- 多种布局模式（垂直/水平/混合）
- 暗黑模式支持
- 多标签页缓存
- 页面级权限控制
- 按钮级权限控制
- 响应式设计

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0（推荐）

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:8848

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 可用脚本

| 命令                 | 说明                        |
| -------------------- | --------------------------- |
| `pnpm dev`           | 启动开发服务器（端口 8848） |
| `pnpm build`         | 构建生产环境代码            |
| `pnpm build:staging` | 构建预发布环境代码          |
| `pnpm preview`       | 预览构建结果                |
| `pnpm typecheck`     | TypeScript 类型检查         |
| `pnpm lint`          | 代码检查和格式化            |

## 自定义指令

项目内置了多个实用的自定义指令：

| 指令          | 说明     |
| ------------- | -------- |
| `v-auth`      | 权限验证 |
| `v-copy`      | 一键复制 |
| `v-longpress` | 长按事件 |
| `v-optimize`  | 性能优化 |
| `v-perms`     | 权限判断 |
| `v-ripple`    | 波纹效果 |

## 代码规范

项目配置了完整的代码规范工具：

- **ESLint** - JavaScript/TypeScript 代码检查
- **Prettier** - 代码格式化
- **Stylelint** - CSS/SCSS 样式检查
- **Commitlint** - Git 提交信息规范

## 浏览器支持

| 浏览器  | 支持版本 |
| ------- | -------- |
| Chrome  | 最新版   |
| Firefox | 最新版   |
| Safari  | 最新版   |
| Edge    | 最新版   |

## 在线预览

[在线演示](https://shljy1.netlify.app)

## 许可证

[MIT](LICENSE)

## 致谢

- [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) - 优秀的后台管理模板
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [TresJS](https://tresjs.org/) - Vue 3 的 Three.js 封装
