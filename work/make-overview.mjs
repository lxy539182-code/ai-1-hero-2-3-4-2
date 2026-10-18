import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
)
const previewDir = path.resolve('work/preview')

const panels = [
  'final-hero.png',
  '02-about-1920.png',
  '03-work-1920.png',
  '05-contact-1920.png',
]

const buffers = await Promise.all(
  panels.map((file) =>
    sharp(path.join(previewDir, file))
      .resize(960, 540, { fit: 'cover' })
      .toBuffer(),
  ),
)

await sharp({
  create: {
    width: 1920,
    height: 1080,
    channels: 4,
    background: { r: 8, g: 9, b: 9, alpha: 1 },
  },
})
  .composite([
    { input: buffers[0], left: 0, top: 0 },
    { input: buffers[1], left: 960, top: 0 },
    { input: buffers[2], left: 0, top: 540 },
    { input: buffers[3], left: 960, top: 540 },
  ])
  .png()
  .toFile(path.resolve('outputs/style-overview.png'))
