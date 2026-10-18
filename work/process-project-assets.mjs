import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
)

const framesDir = path.resolve('work/video-frames')
const outputDir = path.resolve('public/media/projects')
fs.mkdirSync(outputDir, { recursive: true })

const imageJobs = [
  // Project covers
  [path.join(framesDir, 'aigc-coffee-2.jpg'), 'aigc-coffee-cover.webp', 1800],
  [path.join(framesDir, 'aigc-fight-2.jpg'), 'aigc-fight-cover.webp', 1800],
  [path.join(framesDir, 'aigc-moka-3.jpg'), 'aigc-moka-cover.webp', 1800],
  [path.join(framesDir, 'aigc-blank-2.jpg'), 'aigc-blank-cover.webp', 1800],
  [
    path.join(framesDir, 'interaction-control-3.jpg'),
    'interaction-control-cover.webp',
    1800,
  ],
  [path.join(framesDir, 'story-yanduo-3.jpg'), 'story-yanduo-cover.webp', 1800],

  // Additional stills
  [path.join(framesDir, 'aigc-coffee-1.jpg'), 'aigc-coffee-still-01.webp', 1400],
  [path.join(framesDir, 'aigc-coffee-3.jpg'), 'aigc-coffee-still-02.webp', 1400],
  [path.join(framesDir, 'aigc-fight-1.jpg'), 'aigc-fight-still-01.webp', 1400],
  [path.join(framesDir, 'aigc-fight-3.jpg'), 'aigc-fight-still-02.webp', 1400],
  [path.join(framesDir, 'aigc-moka-1.jpg'), 'aigc-moka-still-01.webp', 1400],
  [path.join(framesDir, 'aigc-moka-2.jpg'), 'aigc-moka-still-02.webp', 1400],
  [path.join(framesDir, 'aigc-blank-1.jpg'), 'aigc-blank-still-01.webp', 1400],
  [path.join(framesDir, 'aigc-blank-3.jpg'), 'aigc-blank-title.webp', 1400],
  [
    path.join(framesDir, 'interaction-control-1.jpg'),
    'interaction-control-still-01.webp',
    1400,
  ],
  [
    path.join(framesDir, 'interaction-control-2.jpg'),
    'interaction-control-still-02.webp',
    1400,
  ],
  [path.join(framesDir, 'story-yanduo-1.jpg'), 'story-yanduo-still-01.webp', 1400],
  [path.join(framesDir, 'story-yanduo-2.jpg'), 'story-yanduo-still-02.webp', 1400],

  // Process / workflow stills
  [
    'C:/Users/az/Desktop/zuop/AIGC/创意广告视频/libtv工作流.png',
    'aigc-coffee-workflow.webp',
    1800,
  ],
  [
    'C:/Users/az/Desktop/zuop/AIGC/创意广告视频/创意广告咖啡剪映截图.jpg',
    'aigc-coffee-edit.webp',
    1800,
  ],
  [
    'C:/Users/az/Desktop/zuop/AIGC/打斗30s/libtv工作流截图.png',
    'aigc-fight-workflow.webp',
    1800,
  ],
  [
    'C:/Users/az/Desktop/zuop/AIGC/打斗30s/打斗剪映工作台截图.jpg',
    'aigc-fight-edit.webp',
    1800,
  ],
  [
    'C:/Users/az/Desktop/zuop/新建文件夹 (2)/画布工作流.png',
    'aigc-moka-workflow.webp',
    1800,
  ],
  [
    'C:/Users/az/Desktop/zuop/ALGC/画布工作流.png',
    'aigc-blank-workflow.webp',
    1800,
  ],
]

for (const [source, filename, width] of imageJobs) {
  await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5 })
    .toFile(path.join(outputDir, filename))
}

const outputs = fs
  .readdirSync(outputDir)
  .filter((name) => name.endsWith('.webp'))
  .map((name) => {
    const size = fs.statSync(path.join(outputDir, name)).size
    return `${name}  ${(size / 1024).toFixed(0)} KB`
  })

console.log(outputs.join('\n'))
