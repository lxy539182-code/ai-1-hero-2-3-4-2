import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
)
const workDir = path.dirname(fileURLToPath(import.meta.url))
const outputDir = path.join(workDir, 'preview')
fs.mkdirSync(outputDir, { recursive: true })

const browser = await chromium.launch({
  executablePath:
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
})

for (const [width, height, name] of [
  [1920, 1080, 'hero-header-1920.png'],
  [1440, 900, 'hero-header-1440.png'],
  [1024, 768, 'hero-header-1024.png'],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  })
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1400)
  await page.screenshot({ path: path.join(outputDir, name) })
  await page.close()
}

await browser.close()
