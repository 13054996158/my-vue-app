# my-vue-app

## 项目介绍
这是一个基于 Vue 3 和 Element Plus 的多标签页示例项目，包含路由与标签页同步管理功能，支持标签页切换、关闭和动态添加，适合用作后台管理系统基础框架。

## 功能特点
- 多标签页（Tab）管理
- 路由与标签页同步，保证页面切换和标签高亮一致
- 支持关闭标签页，自动切换到上一个标签页
- 通过 `router-view` 的 `key` 强制刷新路由组件
- 简单易扩展，适合二次开发

## 技术栈
- Vue 3
- Vue Router 4
- Element Plus

## 快速开始
1. 克隆项目
   ```bash
   git clone https://github.com/你的用户名/my-vue-app.git
   cd my-vue-app
   npm install
安装依赖

bash
复制
编辑
npm install
运行项目

bash
复制
编辑
npm run dev
目录结构
bash
复制
编辑
src/
 ├─ components/       # 公共组件
 ├─ views/            # 页面视图
 ├─ router/           # 路由配置
 ├─ assets/           # 资源文件
 └─ main.js           # 入口文件
贡献
欢迎提出问题或提交 PR！

许可证
