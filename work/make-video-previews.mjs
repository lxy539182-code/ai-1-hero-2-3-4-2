import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
)

const workDir = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.resolve('public/media/projects')
fs.mkdirSync(outputDir, { recursive: true })

const videos = [
  {
    id: 'aigc-coffee',
    file: 'C:/Users/az/Desktop/zuop/AIGC/创意广告视频/创意咖啡广告.mp4',
    start: 18,
    seconds: 6,
  },
  {
    id: 'aigc-fight',
    file: 'C:/Users/az/Desktop/zuop/AIGC/打斗30s/赛博朋克风打斗.mp4',
    start: 8,
    seconds: 6,
  },
  {
    id: 'aigc-moka',
    file: 'C:/Users/az/Desktop/zuop/新建文件夹 (2)/摩卡壶（广告类ALGC).mp4',
    start: 27,
    seconds: 6,
  },
  {
    id: 'aigc-blank',
    file: 'C:/Users/az/Desktop/zuop/ALGC/空白（故事类ALGC作品）.mp4',
    start: 41,
    seconds: 7,
  },
  {
    id: 'interaction-control',
    file: 'C:/Users/az/Desktop/zuop/td交互/手势控制.mp4',
    start: 24,
    seconds: 6,
  },
  {
    id: 'story-yanduo',
    file: 'C:/Users/az/Desktop/zuop/情景故事/烟堕.mp4',
    start: 536,
    seconds: 7,
  },
]

const browser = await chromium.launch({
  executablePath:
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
  args: [
    '--allow-file-access-from-files',
    '--autoplay-policy=no-user-gesture-required',
  ],
})

const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
})
page.setDefaultTimeout(120_000)
await page.goto(pathToFileURL(path.join(workDir, 'video-extract.html')).href)

const results = []

for (const videoSpec of videos) {
  const result = await page.evaluate(
    async ({ videoUrl, start, seconds }) => {
      const video = document.createElement('video')
      video.src = videoUrl
      video.preload = 'auto'
      video.playsInline = true
      video.muted = true
      document.body.append(video)

      await new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', resolve, { once: true })
        video.addEventListener(
          'error',
          () => reject(video.error || new Error('Video failed to load')),
          { once: true },
        )
      })

      video.currentTime = Math.min(start, Math.max(video.duration - seconds, 0))
      await new Promise((resolve) => {
        video.addEventListener('seeked', resolve, { once: true })
      })
      await video.play()
      await new Promise((resolve) => setTimeout(resolve, 350))

      const canvas = document.createElement('canvas')
      canvas.width = 1280
      canvas.height = 720
      const context = canvas.getContext('2d', { alpha: false })
      let drawing = true
      const drawFrame = () => {
        if (!drawing) return
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        requestAnimationFrame(drawFrame)
      }
      drawFrame()

      const stream = canvas.captureStream(30)
      const candidates = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
      ]
      const mimeType = candidates.find((type) =>
        MediaRecorder.isTypeSupported(type),
      )

      if (!mimeType) throw new Error('No WebM MediaRecorder support')

      const chunks = []
      const recorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 2_000_000,
        audioBitsPerSecond: 96_000,
      })
      const finished = new Promise((resolve, reject) => {
        recorder.onerror = (event) => reject(event.error)
        recorder.onstop = () => resolve()
      })
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data)
      }

      recorder.start(250)
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
      recorder.stop()
      await finished
      drawing = false
      video.pause()
      stream.getTracks().forEach((track) => track.stop())
      video.remove()

      const blob = new Blob(chunks, { type: mimeType })
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(reader.error)
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
    {
      videoUrl: pathToFileURL(videoSpec.file).href,
      start: videoSpec.start,
      seconds: videoSpec.seconds,
    },
  )

  const base64 = result.split(',')[1]
  const filename = `${videoSpec.id}-preview.webm`
  const targetPath = path.join(outputDir, filename)
  fs.writeFileSync(targetPath, Buffer.from(base64, 'base64'))
  results.push({
    filename,
    seconds: videoSpec.seconds,
    kilobytes: Math.round(fs.statSync(targetPath).size / 1024),
  })
}

console.log(JSON.stringify(results, null, 2))
await browser.close()
