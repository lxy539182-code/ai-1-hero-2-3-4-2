import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp',
)
const framesDir = path.resolve('work/video-frames')

const groups = {
  'aigc-frames.jpg': ['aigc-coffee', 'aigc-fight', 'aigc-moka', 'aigc-blank'],
  'other-frames.jpg': ['interaction-control', 'story-yanduo'],
}

for (const [filename, ids] of Object.entries(groups)) {
  const frames = []
  for (const id of ids) {
    for (let index = 1; index <= 3; index += 1) {
      frames.push(
        await sharp(path.join(framesDir, `${id}-${index}.jpg`))
          .resize(640, 360, { fit: 'cover' })
          .toBuffer(),
      )
    }
  }

  const composites = frames.map((input, index) => ({
    input,
    left: (index % 3) * 640,
    top: Math.floor(index / 3) * 360,
  }))

  await sharp({
    create: {
      width: 1920,
      height: ids.length * 360,
      channels: 4,
      background: '#080909',
    },
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(path.resolve('work', filename))
}
