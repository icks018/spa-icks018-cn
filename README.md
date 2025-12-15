# 流沙聚·拾光

> 一个基于 Next.js 的唯美静态页面收藏站

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)

## ✨ 特性

- 🎨 **唯美设计** - 复古纸质质感，优雅的排版
- 📱 **响应式布局** - 完美适配移动端和桌面端
- 🔍 **实时搜索** - 快速查找心仪的页面
- 🏷️ **分类筛选** - 按分类浏览内容
- ❤️ **本地收藏** - 使用 localStorage 持久化收藏
- ♾️ **无限滚动** - 流畅的内容加载体验
- 🎭 **200条标语** - 每次访问随机展示诗意标语

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局（含BottomNav）
│   ├── page.tsx             # 首页
│   ├── explore/page.tsx     # 探索页
│   ├── saved/page.tsx       # 收藏页
│   └── globals.css          # 全局样式
├── components/
│   ├── layout/              # 布局组件
│   │   ├── Header.tsx       # 顶部导航
│   │   ├── Footer.tsx       # 页脚
│   │   └── BottomNav.tsx    # 移动端底部导航
│   ├── pages/               # 页面组件
│   │   ├── PinCard.tsx      # 卡片组件
│   │   └── DetailModal.tsx  # 详情弹窗
│   ├── ui/                  # 基础UI组件
│   │   ├── Button.tsx
│   │   ├── SearchInput.tsx
│   │   └── Tag.tsx
│   └── views/               # 视图组件
│       ├── HomeView.tsx     # 首页视图
│       ├── ExploreView.tsx  # 探索视图
│       └── SavedView.tsx    # 收藏视图
├── hooks/
│   └── useInfiniteScroll.ts # 无限滚动Hook
├── lib/
│   ├── mockData.ts          # 模拟数据（8条）
│   ├── slogans.ts           # 标语数据（200条）
│   ├── favorites.ts         # 收藏功能
│   └── utils.ts             # 工具函数
├── types/
│   ├── page.ts              # Page类型定义
│   └── index.ts             # 类型导出
└── public/                  # 静态资源
```

## 🎨 技术栈

- **框架**: Next.js 15.5.0 (App Router)
- **UI库**: React 19.1.0
- **样式**: Tailwind CSS v4
- **语言**: TypeScript 5.0
- **图标**: Phosphor Icons
- **字体**: Noto Sans SC, Noto Serif SC

## 📱 页面说明

### 首页 (`/`)
- 随机标语展示（200条诗意标语）
- 实时日期时间显示
- 搜索功能
- 显示最新5条内容

### 探索页 (`/explore`)
- 分类筛选（爱情表白、创意设计、节日祝福）
- 搜索功能
- 无限滚动加载（每页12条）
- 点击加载更多按钮

### 收藏页 (`/saved`)
- 显示所有收藏内容
- 无限滚动加载
- 本地持久化存储
- 空状态提示

## 🎯 核心功能

### 收藏功能
使用 `localStorage` 实现本地收藏：

```typescript
import { toggleFavorite, isFavorite } from '@/lib/favorites';

// 切换收藏状态
const isNowFavorited = toggleFavorite(pageData);

// 检查是否已收藏
const favorited = isFavorite(pageId);
```

### 无限滚动
使用自定义 Hook 实现：

```typescript
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const { page, loading, hasMore, loadMore } = useInfiniteScroll({
  threshold: 300,
  pageSize: 12,
});
```

### 搜索功能
实时搜索，支持标题、描述、标签、分类：

```typescript
const filteredData = data.filter(item => 
  item.title.toLowerCase().includes(query.toLowerCase()) ||
  item.description.toLowerCase().includes(query.toLowerCase()) ||
  item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
);
```

## 🎭 数据结构

### Page 类型

```typescript
interface Page {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  thumbnail: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 部署

项目已优化为纯静态站点，可部署到任何静态托管服务：

- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 📝 开发规范

- ✅ 使用 TypeScript 严格模式
- ✅ 遵循 ESLint 规则
- ✅ 组件使用函数式组件
- ✅ 使用 Tailwind CSS 编写样式
- ✅ 保持代码简洁，无冗余

## 📄 许可证

MIT License © 2025 流沙聚工作室

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

---

**流沙聚·拾光** - 收藏美好瞬间，分享创意灵感 ✨
