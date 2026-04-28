# 合谷科技 Sanity CMS 集成指南

## 概述

本项目已集成 Sanity.io 作为后台内容管理系统。支持通过 Sanity Studio 管理：
- 产品信息
- 公司信息
- 联系方式
- 首页内容

## 快速开始

### 1. 注册 Sanity 账号

访问 [sanity.io](https://www.sanity.io/) 注册账号并创建新项目。

### 2. 获取项目凭证

在 Sanity 管理后台获取：
- `Project ID`
- `Dataset name`（通常是 `production`）

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你的 Sanity 配置：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=你的-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=你的-read-token（可选）
```

### 4. 部署 Sanity Studio（可选）

如果需要本地开发时使用 Studio，运行：

```bash
npx sanity deploy
```

或者直接访问 `/studio` 路径（需要先配置好 projectId）。

## Schema 说明

### Product（产品）

管理所有喷雾风扇产品：
- `model`: 产品型号
- `series`: 产品系列（AC/DC/Outdoor/Industrial）
- `images`: 产品图片
- `description`: 多语言产品描述
- `specs`: 规格参数
- `features`: 功能特点
- `packing`: 包装信息
- `order`: 排序
- `isFeatured`: 是否精选产品

### CompanyInfo（公司信息）

管理公司基本信息：
- `name`: 公司名称（多语言）
- `address`: 地址（多语言）
- `phone`: 电话
- `email`: 邮箱
- `contacts`: 社交媒体账号

### HomePage（首页内容）

管理首页展示内容：
- `hero`: Hero 轮播图
- `advantages`: 公司优势
- `partners`: 合作伙伴

## 降级方案

如果没有配置 Sanity，项目会自动使用硬编码的 fallback 数据：
- 产品数据：`src/lib/products.ts`
- 公司信息：`src/lib/utils.ts`

这样确保了即使不配置 Sanity，网站也能正常运行。

## 访问后台

配置好环境变量后，访问：
```
http://localhost:5000/studio
```

## 下一步

1. 在 Sanity Studio 中创建你的第一个产品
2. 输入公司信息和联系方式
3. 配置首页内容
4. 部署到生产环境

## 技术细节

- Sanity Client: `src/lib/sanity.ts`
- 数据获取层: `src/lib/sanity-data.ts`
- Schema 定义: `sanity/schemas/`
