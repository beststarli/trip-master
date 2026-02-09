# React部分作业
采用个人搭建[React工程脚手架](https://github.com/beststarli/react-scaffold)搭建

## 项目概述
这是一个基于 Vite + React + Tailwind 的小型 Quiz（测验）应用，使用 shadcn/ui 的按钮组件作为基础 UI 组件。题库位于 `public/quizJSON.json`，每次加载随机抽取 10 道题供用户答题。

## 使用的主要工具与库

- Vite
	- 作用：快速的开发服务器与打包工具，提供极速热更新（HMR）与现代构建流水线。
	- 关键配置文件：`vite.config.ts`。
	- 常用命令：`npm run dev`（启动开发服务器）、`npm run build`（构建）。

- React
	- 作用：构建应用的 UI 与交互，使用函数组件与 Hooks 管理状态。
	- 主要组件：
		- `src/App.tsx`：全局状态管理（题库加载、当前题、分数、答题流程）。
		- `src/components/quizArea.tsx`：单题展示（题干 + 选项）。
		- `src/components/selectOpt.tsx`：选项按钮（封装的 `Button`，支持正确/错误高亮）。
		- `src/components/titleArea.tsx`：顶部显示当前分数。
		- `src/components/footerArea.tsx`：底部控制（下一题 / 重新开始）。

- shadcn/ui
	- 作用：基于 Radix + Tailwind 的可复用 UI 组件集合。
	- 在本项目中用作统一风格的 `Button` 组件（位于 `src/components/ui/button.tsx`），`SelectOpt` 与 `FooterArea` 等复用了该组件来保持样式一致性。

- Tailwind CSS
	- 作用：原子化的实用类 CSS，用于快速构建响应式样式。项目中广泛使用 Tailwind 类名进行布局和样式控制（例如渐变背景、大号标题、按钮样式等）。
	- 主要样式文件：`src/App.css`（含 Tailwind 指令）。

## 功能与用户流程

- 加载题库：应用从 `public/quizJSON.json` 读取题目数据（JSON）。
- 随机抽题：每次加载随机抽取 10 道题用于本次测验。 
- 作答流程：
	1. 显示题干与候选选项。
	2. 用户选择一个选项后，立即显示该选项为正确（绿色）或错误（红色）；如果错误同时展示正确选项为绿色。
	3. 正确答案时 `TitleArea` 的分数会即时更新。
	4. 底部 `FooterArea` 在答题后显示“下一题”按钮，用户点击后切换下一题（不是自动立即跳转）。
	5. 完成 10 道题后，显示“作答完毕”页面（醒目的大号文字、渐变背景和总分），并提供“重新开始”按钮以重新抽题并重置分数。

## 运行和调试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# （可选）运行 ESLint
npm run lint
```