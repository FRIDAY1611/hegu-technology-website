# 合谷科技官网项目 (HEGU Technology)

## 项目概览

合谷科技（HEGU Technology）官网是一个高端品牌独立站，采用苹果官网风格的设计，为中国喷雾风扇制造商打造。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **动画**: Framer Motion

## 目录结构

```
├── public/                 # 静态资源
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── [locale]/       # 多语言路由
│   │   │   ├── page.tsx            # 首页
│   │   │   ├── layout.tsx          # 语言布局
│   │   │   ├── about/page.tsx      # 关于我们
│   │   │   ├── contact/page.tsx    # 联系我们
│   │   │   └── products/           # 产品页面
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 重定向到默认语言
│   │   └── globals.css      # 全局样式
│   ├── components/
│   │   ├── ui/              # Shadcn UI 组件库
│   │   └── shared/          # 共享组件
│   │       ├── Header.tsx   # 头部导航
│   │       ├── Footer.tsx   # 页脚
│   │       ├── FadeIn.tsx   # 淡入动画组件
│   │       └── ProductCard.tsx  # 产品卡片
│   ├── lib/                 # 工具库
│   │   ├── products.ts      # 产品数据
│   │   └── utils.ts         # 通用工具函数
│   └── locales/             # 语言文件
│       ├── en.json          # 英文
│       └── zh.json          # 中文
├── .coze                    # 配置文件
├── package.json             # 项目依赖管理
└── tsconfig.json            # TypeScript 配置
```

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

常用命令：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### 多语言支持

- 支持英文 (en) 和中文 (zh) 两种语言
- 路由格式：`/en/...` 和 `/zh/...`
- 语言切换通过 Header 组件中的 Globe 图标实现

### 产品数据

产品数据存储在 `src/lib/products.ts` 中，包含：
- 13 款产品，分为 4 个系列：AC, DC, Outdoor, Industrial
- 完整的规格参数、包装信息、功能特点
- 产品图片使用占位符，可在后续替换为真实图片

## UI 设计与组件规范

- 项目采用 shadcn/ui 组件、风格和规范
- 主题配色使用 sky 色系，呼应喷雾风扇的冷却功能
- 字体采用 business 风格，圆角 lg，阴影 cool

### 设计风格

- **苹果式高端风格**: 大量留白、大图小字、极细字重与大字号对比
- **配色**: 纯白背景、浅灰辅助、水蓝色强调
- **动效**: Framer Motion 实现滚动淡入、悬停放大等效果
- **组件**: 圆角 20px 卡片、胶囊型按钮、毛玻璃导航栏

## 页面结构

### 首页 (Home)
- Hero 轮播：3 张场景图自动轮播
- 公司优势：4 大模块卡片展示
- 产品系列：3 个大卡片导航
- 精选产品：明星产品展示
- 合作伙伴：国家网格展示
- CTA 区域：引导联系

### 产品分类页
- 系列标题 + 描述
- 产品网格卡片展示
- 每个卡片包含型号、简介、规格

### 产品详情页
- 产品图片占位
- 型号、系列标签、描述
- 规格参数表格
- 功能特点图标展示
- 包装信息表
- 相关产品推荐
- 报价弹窗表单

### 关于我们
- 公司介绍
- 使命与愿景
- 发展历程时间线
- 工厂展示占位
- 数据统计卡片

### 联系我们
- 询盘表单（姓名、公司、邮箱、电话、国家、感兴趣产品、留言）
- 公司信息（地址、邮箱、电话）
- Google Maps 占位

## 构建和测试命令

```bash
# 开发环境
pnpm install
pnpm dev

# 生产构建
pnpm build
pnpm start

# 代码检查
pnpm ts-check
pnpm lint
```

## 性能优化

- 使用 Next.js 16 App Router
- Framer Motion 动画使用 Intersection Observer 触发
- 组件按需加载
- 图片懒加载（占位符准备）

## 快速修改指南

### 修改产品数据
编辑 `src/lib/products.ts` 文件，添加或修改产品信息。

### 修改语言内容
编辑 `src/locales/en.json` 和 `src/locales/zh.json` 文件。

### 修改主题配色
主题已通过 Shadcn 主题脚本配置，如需调整可修改 `src/app/globals.css` 中的 CSS 变量。

### 添加新页面
在 `src/app/[locale]/` 目录下创建新的页面文件夹和 `page.tsx` 文件。
