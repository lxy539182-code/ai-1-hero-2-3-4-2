# 李鑫宇个人作品集 · 基础版

已完成 React + Vite 版本的暗色个人作品集，包含：

- 参考海报式排版重做的超大 `PORTFOLIO` 头部、竖排“作品集”、轨道图形与荧光黄滚动信息条
- 全站统一的荧光黄视觉系统、粗黑海报字体、技术网格与区块编号标签
- 全屏 Hero、导航、联系按钮与本地循环视频背景
- 个人介绍、联系方式、项目数据、经历与纯图形身份面板（未使用本人照片）
- 4 个 AIGC 作品、1 个 TouchDesigner 实时交互、1 个情景短片，共 6 个精选项目
- 12 栏宽窄交替作品编排、分类筛选与可交互项目详情弹层
- 每个作品详情内提供轻量无声预览与原片 MP4 下载
- 剪辑 / AIGC / 品牌视觉三类能力卡片
- 整屏联系方式收尾页
- 最大 1700px 版心，以及 1440 / 1920 桌面宽度的视觉验收

## 预览

本地预览服务地址：`http://127.0.0.1:4173/`

预览图：

- `portfolio-preview.png`：首屏
- `portfolio-full.png`：整站长图
- `style-overview.png`：全站风格总览

## 运行

解压 `portfolio-site.zip` 后，在目录内运行：

```bash
pnpm install
pnpm dev
```

生产构建与预览：

```bash
pnpm build
pnpm preview
```

## 下载说明

六个作品的“下载完整成片”由 `film-downloads-plugin.js` 从本机 `E:/AIGC剧本/zuop/` 流式读取原始 MP4，支持完整下载、HEAD 和 Range 分段请求。因此本地 `dev` / `preview` 可直接使用；换电脑或正式部署时，需要上传 MP4 并更新 `src/data.js` 中的 `downloadUrl`，或修改插件里的文件映射。

## 素材替换

六个作品的封面、过程图和轻量预览视频位于 `public/media/projects/`。后续替换真实海报或成片截图时，保持文件名不变即可；Hero 的 `hero-loop.webm` 也可以直接替换成个人 Showreel。
