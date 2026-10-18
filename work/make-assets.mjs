import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const runtimeModules =
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
const { chromium } = require(`${runtimeModules}/playwright`)
const sharp = require(`${runtimeModules}/sharp`)

const workDir = path.dirname(fileURLToPath(import.meta.url))
const projectDir = path.resolve(workDir, '..')
const mediaDir = path.join(projectDir, 'public', 'media')
const edgePath =
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

fs.mkdirSync(mediaDir, { recursive: true })

async function makePortrait() {
  const source = 'D:/简历/证件照-白底-高清.jpg'
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const output = Buffer.from(data)
  const width = info.width
  const height = info.height
  const pixelCount = width * height

  // Flood-fill the white backdrop from the image borders. Keeping the
  // removal connected to the outside avoids punching transparent holes
  // through lens reflections, while still catching the hair fringe.
  const transparent = new Uint8Array(pixelCount)
  const queue = new Int32Array(pixelCount)
  let queueStart = 0
  let queueEnd = 0

  const isBackgroundCandidate = (pixelIndex) => {
    const offset = pixelIndex * 4
    const r = output[offset]
    const g = output[offset + 1]
    const b = output[offset + 2]
    const min = Math.min(r, g, b)
    const chroma = Math.max(r, g, b) - min
    return min >= 210 && chroma < 22
  }

  const queuePixel = (pixelIndex) => {
    if (!transparent[pixelIndex] && isBackgroundCandidate(pixelIndex)) {
      transparent[pixelIndex] = 1
      queue[queueEnd] = pixelIndex
      queueEnd += 1
    }
  }

  for (let x = 0; x < width; x += 1) {
    queuePixel(x)
    queuePixel((height - 1) * width + x)
  }
  for (let y = 0; y < height; y += 1) {
    queuePixel(y * width)
    queuePixel(y * width + width - 1)
  }

  while (queueStart < queueEnd) {
    const pixelIndex = queue[queueStart]
    queueStart += 1
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)

    if (x > 0) queuePixel(pixelIndex - 1)
    if (x < width - 1) queuePixel(pixelIndex + 1)
    if (y > 0) queuePixel(pixelIndex - width)
    if (y < height - 1) queuePixel(pixelIndex + width)
  }

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    output[pixelIndex * 4 + 3] = transparent[pixelIndex] ? 0 : 255
  }

  // Erode the silhouette by two pixels. This removes the pale JPEG fringe
  // around hair and shoulders without touching the face or shirt interior.
  let opaque = new Uint8Array(pixelCount)
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    opaque[pixelIndex] = output[pixelIndex * 4 + 3] > 128 ? 1 : 0
  }

  for (let pass = 0; pass < 3; pass += 1) {
    const next = new Uint8Array(opaque)
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const pixelIndex = y * width + x
        if (!opaque[pixelIndex]) continue
        if (
          !opaque[pixelIndex - 1] ||
          !opaque[pixelIndex + 1] ||
          !opaque[pixelIndex - width] ||
          !opaque[pixelIndex + width]
        ) {
          next[pixelIndex] = 0
        }
      }
    }
    opaque = next
  }

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    output[pixelIndex * 4 + 3] = opaque[pixelIndex] ? 255 : 0
  }

  // Build a lightly blurred alpha mask to keep the final silhouette
  // natural rather than cut with a hard digital edge.
  const alphaMask = Buffer.alloc(pixelCount)
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    alphaMask[pixelIndex] = output[pixelIndex * 4 + 3]
  }
  const softenedMask = await sharp(alphaMask, {
    raw: { width, height, channels: 1 },
  })
    .blur(0.55)
    .raw()
    .toBuffer({ resolveWithObject: true })
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    output[pixelIndex * 4 + 3] =
      softenedMask.data[pixelIndex * softenedMask.info.channels]
  }

  await sharp(output, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 1100, withoutEnlargement: false })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(path.join(mediaDir, 'portrait-cutout.webp'))
}

async function makeBoards(browser) {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
  })
  const labUrl = pathToFileURL(path.join(workDir, 'asset-lab.html')).href
  await page.goto(labUrl, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)

  const boards = [
    ['museum', 'project-museum.webp'],
    ['seasons', 'project-seasons.webp'],
    ['aigc', 'project-aigc.webp'],
    ['campus', 'project-campus.webp'],
  ]

  for (const [id, filename] of boards) {
    const pngPath = path.join(workDir, `${id}.png`)
    await page.locator(`#${id}`).screenshot({ path: pngPath })
    await sharp(pngPath)
      .webp({ quality: 91, effort: 5 })
      .toFile(path.join(mediaDir, filename))
  }

  await page.close()
}

async function makeHeroVideo(browser) {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  })
  const heroUrl = pathToFileURL(path.join(workDir, 'hero-motion.html')).href
  await page.goto(heroUrl, { waitUntil: 'load' })
  await page.waitForTimeout(100)

  const dataUrl = await page.evaluate(async () => {
    const canvas = document.querySelector('#motion-field')
    const candidates = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ]
    const mimeType = candidates.find((type) =>
      MediaRecorder.isTypeSupported(type),
    )

    if (!mimeType) {
      throw new Error('No supported WebM MIME type for MediaRecorder')
    }

    const stream = canvas.captureStream(30)
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 5_500_000,
    })
    const chunks = []
    const finished = new Promise((resolve, reject) => {
      recorder.onerror = (event) => reject(event.error)
      recorder.onstop = () => resolve()
    })

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data)
    }

    recorder.start(500)
    await new Promise((resolve) => setTimeout(resolve, 8200))
    recorder.stop()
    await finished

    const blob = new Blob(chunks, { type: mimeType })
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = () => reject(reader.error)
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(blob)
    })
  })

  const base64 = dataUrl.split(',')[1]
  fs.writeFileSync(
    path.join(mediaDir, 'hero-loop.webm'),
    Buffer.from(base64, 'base64'),
  )

  await page.waitForTimeout(50)
  await page.screenshot({
    path: path.join(mediaDir, 'hero-poster.jpg'),
    type: 'jpeg',
    quality: 88,
  })

  await page.close()
}

const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
})

try {
  await makePortrait()
  await makeBoards(browser)
  await makeHeroVideo(browser)
} finally {
  await browser.close()
}

const generated = fs
  .readdirSync(mediaDir)
  .filter((name) => /\.(webp|png|jpg|webm)$/.test(name))
  .map((name) => {
    const stat = fs.statSync(path.join(mediaDir, name))
    return `${name}  ${(stat.size / 1024).toFixed(0)} KB`
  })

console.log(generated.join('\n'))
