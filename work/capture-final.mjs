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
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
})

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.evaluate(() => {
  document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
    image.loading = 'eager'
  })
})
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.7)
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((resolve) => setTimeout(resolve, 110))
  }
  window.scrollTo(0, 0)
})
await page.evaluate(() =>
  Promise.all(
    [...document.images].map((image) =>
      image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          }),
    ),
  ),
)
await page.addStyleTag({
  content: `
    [data-reveal] {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  `,
})
await page.waitForTimeout(700)

await page.screenshot({
  path: path.join(outputDir, 'final-hero.png'),
})
await page.screenshot({
  path: path.join(outputDir, 'final-full-page.png'),
  fullPage: true,
})
await page.locator('.identity-plate').screenshot({
  path: path.join(outputDir, 'final-identity.png'),
})
await page.locator('#work').screenshot({
  path: path.join(outputDir, 'final-work-section.png'),
})

await browser.close()
