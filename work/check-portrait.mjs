import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
)

const portrait = await sharp(
  path.resolve('public/media/portrait-cutout.webp'),
)
  .resize({ height: 760 })
  .toBuffer()

await sharp({
  create: {
    width: 700,
    height: 800,
    channels: 4,
    background: { r: 14, g: 16, b: 16, alpha: 1 },
  },
})
  .composite([{ input: portrait, gravity: 'south' }])
  .png()
  .toFile(path.resolve('work/portrait-on-dark.png'))
