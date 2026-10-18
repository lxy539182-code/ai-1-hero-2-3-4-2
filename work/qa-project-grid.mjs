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
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(error.message))

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.locator('#work').scrollIntoViewIfNeeded()
await page.waitForTimeout(900)

const filterResults = {}
const filterButtons = page.locator('.work-filters button')

for (let index = 0; index < (await filterButtons.count()); index += 1) {
  const button = filterButtons.nth(index)
  const label = (await button.innerText()).replace(/\s+/g, ' ').trim()
  await button.click()
  await page.waitForTimeout(260)
  filterResults[label] = await page.locator('.project-card').count()
}

await filterButtons.first().click()
await page.waitForTimeout(400)
await page.screenshot({
  path: path.join(outputDir, 'work-grid-1920.png'),
})

const cards = page.locator('.project-card')
const projectResults = []

for (let index = 0; index < (await cards.count()); index += 1) {
  const card = cards.nth(index)
  const title = (await card.locator('.project-card__title strong').innerText()).trim()
  await card.click()
  await page.waitForTimeout(250)

  const modal = page.locator('.project-modal__panel')
  const video = modal.locator('.project-modal__visual video')
  const videoResult = await video.evaluate(async (element) => {
    element.muted = true
    try {
      await element.play()
      await new Promise((resolve) => setTimeout(resolve, 900))
    } catch (error) {
      return { error: String(error), currentSrc: element.currentSrc }
    }
    return {
      currentSrc: element.currentSrc,
      duration: Number.isFinite(element.duration)
        ? Number(element.duration.toFixed(2))
        : null,
      currentTime: Number(element.currentTime.toFixed(2)),
      videoWidth: element.videoWidth,
      videoHeight: element.videoHeight,
      readyState: element.readyState,
    }
  })

  projectResults.push({
    title,
    galleryImages: await modal.locator('.project-modal__gallery img').count(),
    video: videoResult,
  })

  await page.locator('.project-modal__close').click()
  await page.waitForTimeout(180)
}

await page.locator('.work-filters button').nth(1).click()
await page.waitForTimeout(500)
await page.screenshot({
  path: path.join(outputDir, 'work-grid-aigc-1920.png'),
})

console.log(
  JSON.stringify({ filterResults, projectResults, errors }, null, 2),
)
await browser.close()
