# Research-oriented personal homepage

克制、内容优先的个人学术主页。只有 About、Research Interests、Selected Projects、Contact 四个主区块，英文正文面向潜在导师和科研岗位。

## 开发与预览

需要 Node.js 22.13 或更高版本。

```sh
npm ci
npm run dev
```

开发地址以终端输出为准。默认端口为 3000，且只监听本机。

```sh
npm run build
npm test
npm run preview
```

`build` 先执行 TypeScript 检查，再生成 `dist/client/` 静态页面。`preview` 预览构建产物。部署只需静态目录，不需要数据库、Worker 或应用服务器。保留了 `npm run lint` 和 `npm run format` 供后续维护。

Windows 的构建命令通过一个很小的退出兼容层，让 HTTP 预渲染后的连接清理完成后再退出，规避 [Node 的 libuv 退出竞争问题](https://github.com/nodejs/node/issues/56645)。它保留工具原始退出码，不忽略构建错误；其他平台不改变行为。

## 修改内容

主要内容集中在 `content/site.ts`，布局在 `app/page.tsx`，样式在 `app/globals.css`。`ResourceLink` 保持纯文字链接；外部链接在新标签页打开，并使用 `noopener noreferrer`。

当前使用已确认的姓名 **Hongyun Wang**、邮箱 `2518400042@smail.nju.edu.cn`、[个人 GitHub](https://github.com/NanjinLin) 和 [CUDA 项目仓库](https://github.com/NanjinLin/cuda-performance-engineering)。

头像位于 `public/avatar.jpg`，直接使用用户提供的杏花与麻雀原图。桌面端以 120px 方形放在姓名左侧的现有左栏，介绍文字仍与正文对齐；手机端移到姓名上方并缩小至 96px。顶部直接显示可点击的完整邮箱，手机端链接纵向排列，长地址可自然换行。没有圆形裁剪、边框、阴影或动画。更换头像时替换该文件并同步 `app/page.tsx` 中的 alt 文本。

没有真实 CV 文件时，不显示 CV 入口。首页只保留一个项目 GitHub 入口；详细方法、实验结果和 technical report 统一放在仓库 README 中。

正式部署时，将 `siteMetadata.origin` 设置为实际、已验证的部署地址。它用于 canonical、Open Graph 和分享图的绝对地址，不读取不可信的请求主机头。

## 工程与设计选择

- 沿用 Sites 初始化出的 Vinext / React / TypeScript 结构，采用静态导出。
- 所有区块为语义化 HTML；Projects 仅保留编号、仓库名、标题、副标题、两句简介、核心技术和一个 GitHub 入口。
- 页面不依赖第三方字体、图标库、图表库、动画库或 UI 组件库；移除了初始化模板中未使用的组件和依赖。
- 一套系统无衬线字体，一套系统等宽字体。黑白灰加深蓝，靠留白、对齐与分隔线组织内容。
- 900px、640px、360px 响应式调整；手机改为单列，导航保留可见文字。
- 提供 skip link、focus-visible、正确标题层级、reduced-motion 和打印样式。
- 唯一展示的项目是用户提供的 `cuda-self-learning`；实现细节、benchmark 和 profiling 不在首页展开。

设计参考仅用于学习信息层级，没有复制页面或个人经历：[Tri Dao](https://tridao.me/)、[Tianqi Chen](https://tqchen.com/)。

## 验证

`npm test` 对构建后的静态 HTML 执行自动化检查：区块顺序、标题、锚点、姓名与联系方式、临时文案清理、About 精简文案、项目最小信息层级、详情区域移除、唯一项目 GitHub 入口、外部链接安全属性、响应式与焦点样式、文字对比度、分享元数据、本地资源完整性。

这些检查不等价于真实浏览器或真机视觉测试。设计自查记录位于 `docs/ai-smell-review.md`。

## 分享封面

`public/og.png` 是仅用于 Open Graph / X 的纯文字封面，不出现在页面正文。通过内置 imagegen 生成并检查文字，未使用 CLI。尺寸为 1731 × 909。生成提示词保存在 `docs/social-preview-prompt.md`。

## 托管

本地的 `.openai/hosting.json` 指定 `dist/client/` 为 Sites 静态输出，该文件不提交到 Git。只有存在此配置时才启用 Sites 插件；从 GitHub 获取的源码可以独立构建，不需要 Sites 账号或配置。

如果换到其他静态托管服务，直接使用相同构建目录，并更新 `siteMetadata.origin`。没有服务端状态需要迁移。

GitHub Pages 的自动构建与发布步骤见 [部署指南](docs/github-pages.md)。指南中的 workflow 尚未启用；仅推送源码不会完成网站部署。
