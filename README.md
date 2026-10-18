# 李鑫宇 · 个人作品集

面向 PC 端的个人作品集，使用 React + Vite 构建。视觉方向为暗色、克制、带有影像与技术工作台气质。

## 本地运行

```bash
pnpm install
pnpm dev
```

开发地址默认为 `http://localhost:5173/`。

生产构建与本地预览：

```bash
pnpm build
pnpm preview
```

本地预览地址为 `http://127.0.0.1:4173/`。

## 内容与素材位置

- `src/data.js`：六个作品、经历、能力与统计数据。
- `src/App.jsx`：页面结构、作品筛选与项目详情弹层。
- `src/styles.css`：全站视觉、响应式与动效。
- `public/media/projects/`：六个作品的封面、过程图与无声预览视频。
- `public/media/hero-loop.webm`：首屏循环视频背景。
- `public/media/hero-poster.jpg`：视频加载前/减弱动效模式下的封面。

## 完整成片下载

每个作品详情弹层都提供“下载完整成片”。网页内播放轻量的无声预览，下载按钮提供原始 MP4。

`film-downloads-plugin.js` 把六个下载地址映射到本机的原始成片，并在 `pnpm dev` / `pnpm preview` 中提供流式下载、HEAD 和 Range 分段读取：

- `/downloads/coffee-film.mp4`
- `/downloads/neon-fight.mp4`
- `/downloads/moka-extraction.mp4`
- `/downloads/blank-story.mp4`
- `/downloads/gesture-particles.mp4`
- `/downloads/yanduo-story.mp4`

原始成片位于 `E:/AIGC剧本/zuop/`，因此下载功能依赖这台电脑上的 E 盘素材。正式部署时，应把六个 MP4 上传到静态托管或对象存储，并同步修改 `src/data.js` 中的 `downloadUrl`；也可以直接修改 `film-downloads-plugin.js` 里的文件映射。

## 后续替换建议

作品图与预览视频已经接入真实项目素材。替换时保持 `public/media/projects/` 下文件名不变，或同步修改 `src/data.js` 中对应的路径。

首屏视频建议继续使用 6—10 秒、无声、可循环的 WebM/MP4，并保留同一画面的 JPG 封面，避免移动网络环境下首屏闪烁。

版心最大宽度为 `1700px`，在 `src/styles.css` 的 `--content` 变量中调整。
