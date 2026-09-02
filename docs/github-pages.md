# GitHub Pages 自动部署

目标仓库：`NanjinLin/nanjinlin.github.io`。这是用户站点，部署在域名根路径，不需要修改页面布局、路由或添加仓库子路径。

本文只是配置指南，不会自动启用 GitHub Pages。

## 1. 启用 GitHub Actions 发布

打开仓库的 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。不要选择 Jekyll 模板，也不要直接从源码分支发布：当前项目需要先构建为静态文件。

GitHub Free 账号需要使用公开仓库；若 Pages 页面受组织或账号权限限制，应先解决该限制。

## 2. 设置正式站点地址

在 Pages 设置中确认站点地址。如果没有配置自定义域名，这个用户站点的地址应为 `https://nanjinlin.github.io/`。

将 `content/site.ts` 中的 `siteMetadata.origin` 从 `http://localhost:3000` 改为已确认的正式 origin（例如 `https://nanjinlin.github.io`，不带尾部斜杠）。该字段用于 canonical 和分享元数据，不改变页面视觉。

## 3. 添加 workflow

创建 `.github/workflows/deploy.yml`，内容如下。可在 GitHub 的 **Add file → Create new file** 中创建，也可以在本地创建后提交、推送。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist/client

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

该流程只使用 GitHub 自动提供的短期权限，不需要保存 PAT、GitHub 密码或其他部署密钥。部署产物只有 `dist/client`，不要将整个仓库或 `node_modules` 作为 Pages artifact 上传。

这是直接部署静态 artifact 的流程，不经过 Jekyll，因此不需要添加 `.nojekyll`。也不需要提交 `dist`，或保留单独的 `gh-pages` 分支。

## 4. 验证首次发布

将上述修改提交到 `main` 后，在 **Actions → Deploy to GitHub Pages** 查看运行结果。只有 `build` 和 `deploy` 都成功后，才算部署完成；最终访问地址以部署记录或 **Settings → Pages → Visit site** 为准。

如果提示 Pages 尚未启用，请完成第 1 步，再重新运行 workflow。若 `github-pages` environment 设置了人工审批，则需按页面提示批准本次部署。

用未登录的浏览器窗口检查主页、头像、样式、邮箱和 GitHub 链接。以后每次推送到 `main`，GitHub 都会重新构建、测试并发布。

如果直接在 GitHub 网页修改了文件，下次本地修改前先执行 `git pull --ff-only`，避免本地落后于远程。

## 官方参考

- [GitHub Pages 自定义 workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages 发布来源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Node.js 配置 action](https://github.com/actions/setup-node)
