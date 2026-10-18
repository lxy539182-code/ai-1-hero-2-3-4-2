import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
)

const workDir = path.dirname(fileURLToPath(import.meta.url))
const framesDir = path.join(workDir, 'video-frames')
fs.mkdirSync(framesDir, { recursive: true })

const videos = [
  {
    id: 'aigc-coffee',
    file: 'C:/Users/az/Desktop/zuop/AIGC/创意广告视频/创意咖啡广告.mp4',
  },
  {
    id: 'aigc-fight',
    file: 'C:/Users/az/Desktop/zuop/AIGC/打斗30s/赛博朋克风打斗.mp4',
  },
  {
    id: 'aigc-moka',
    file: 'C:/Users/az/Desktop/zuop/新建文件夹 (2)/摩卡壶（广告类ALGC).mp4',
  },
  {
    id: 'aigc-blank',
    file: 'C:/Users/az/Desktop/zuop/ALGC/空白（故事类ALGC作品）.mp4',
  },
  {
    id: 'interaction-control',
    file: 'C:/Users/az/Desktop/zuop/td交互/手势控制.mp4',
  },
  {
    id: 'story-yanduo',
    file: 'C:/Users/az/Desktop/zuop/情景故事/烟堕.mp4',
  },
]

const browser = await chromium.launch({
  executablePath:
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
  args: ['--allow-file-access-from-files'],
})

const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
})
await page.goto(pathToFileURL(path.join(workDir, 'video-extract.html')).href)

const metadata = []

for (const videoSpec of videos) {
  const result = await page.evaluate(
    async ({ videoUrl, fractions }) => window.readVideoFrames(videoUrl, fractions),
    {
      videoUrl: pathToFileURL(videoSpec.file).href,
      fractions: [0.18, 0.48, 0.78],
    },
  )

  result.frames.forEach((frame, index) => {
    const base64 = frame.dataUrl.split(',')[1]
    fs.writeFileSync(
      path.join(framesDir, `${videoSpec.id}-${index + 1}.jpg`),
      Buffer.from(base64, 'base64'),
    )
  })

  metadata.push({
    id: videoSpec.id,
    file: videoSpec.file,
    duration: Number(result.duration.toFixed(2)),
    width: result.width,
    height: result.height,
  })
}

fs.writeFileSync(
  path.join(workDir, 'video-metadata.json'),
  JSON.stringify(metadata, null, 2),
)

console.log(JSON.stringify(metadata, null, 2))
await browser.close()
