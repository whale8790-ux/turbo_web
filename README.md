# 刘昊然Turbo · 个人作品集

高保真作品集网站,展示 AI Agent / AIGC 应用 / 策略增长方向的产品设计与开发落地成果。

技术栈: **React 19 + Vite 6 + TypeScript (strict) + Tailwind CSS v4 + Motion**。

## 本地运行

**环境要求**: Node.js 20.11+ (项目用 `import.meta.dirname`,需要此版本及以上)

```bash
# 1. 安装依赖
npm install

# 2. 启动 dev server
npm run dev
# → http://localhost:3000

# 3. 生产构建
npm run build
npm run preview

# 4. 类型检查
npm run lint
```

## 目录结构

```
src/
├── App.tsx                 # 顶层布局、风格沙盒、scroll listener
├── main.tsx                # React 入口 + ErrorBoundary
├── data.ts                 # 静态数据(项目案例 / 能力节点)
├── types.ts                # TypeScript 类型定义
├── index.css               # Tailwind v4 @theme 入口 + 全局动画
├── hooks/
│   └── usePersistentState.ts   # 风格选择持久化(localStorage)
└── components/
    ├── ErrorBoundary.tsx   # 渲染错误兜底
    ├── Hero.tsx            # 首屏定位(3 套风格分支)
    ├── CoreProjects.tsx    # 核心实战(2 个项目案例)
    ├── InteractiveDemo.tsx # 内嵌 AIGC 模拟器(iPhone 框架)
    ├── ExplorationProjects.tsx # 探索原型(3 个实验项目)
    └── Footer.tsx          # 简历下载 / 联系方式 / QR
public/
└── favicon.svg             # 浏览器 tab 图标
```

## 关键设计

- **三套视觉风格实时切换**: 赛博极能(默认暗色) / 人文社论(亮色衬线) / 几何包豪斯(高对比度),通过底部浮动沙盒切换
- **风格选择自动持久化**: 选择存到 `localStorage`,下次访问保持
- **端口 3000**: dev server 固定 `http://localhost:3000`,`--host=0.0.0.0` 允许局域网访问
- **AI Studio HMR 关闭**: `DISABLE_HMR=true` 时关闭热更新和文件监听,防止 AI 代理编辑时页面闪烁

## 部署

### Vercel / Netlify
默认配置即可,`npm run build` 产物在 `dist/`,作为静态站托管。

### AI Studio
项目根 `metadata.json` 描述了平台元数据。如果要发布到 Google AI Studio,确保:
- `metadata.json` 的 `majorCapabilities` 与代码实际能力一致
- 平台构建管线是否能从 `devDependencies` 拿到 Vite / TypeScript(部分老管线读 `dependencies`)
- 当前未使用 `GEMINI_API_KEY`(代码中无 Gemini 调用),如需 AI 能力需新增

## 已知约束

- **Unsplash 占位图** (`src/components/InteractiveDemo.tsx`): AIGC Demo 演示图暂用外链,生产前需替换为本地素材
- **AI Studio 模板痕迹**: `metadata.json` / `.env.example` 是模板自带,需要对齐实际能力后清理
- **占位 alert**: `App.tsx:79` / `InteractiveDemo.tsx:780,810,811` 用了 `alert()` 假装有功能(下载/保存/画廊),上线前需替换

## 许可证

SPDX-License-Identifier: Apache-2.0
