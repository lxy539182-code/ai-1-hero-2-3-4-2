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

const errors = []
const projectResults = []
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
})
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(error.message))

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.locator('#work').scrollIntoViewIfNeeded()
await page.waitForTimeout(700)

const cards = page.locator('.project-card')
const cardCount = await cards.count()

for (let index = 0; index < cardCount; index += 1) {
  const card = cards.nth(index)
  const title = (await card.locator('.project-card__title strong').innerText()).trim()
  await card.click()
  await page.waitForTimeout(250)

  const modal = page.locator('.project-modal__panel')
  const row = modal.locator('.project-modal__download-row')
  const action = modal.locator('.project-modal__download-action')
  const rowBox = await row.boundingBox()
  const actionBox = await action.boundingBox()

  projectResults.push({
    title,
    downloadRows: await row.count(),
    downloadActions: await action.count(),
    href: await action.getAttribute('href'),
    filename: await action.getAttribute('download'),
    metadata: (await modal.locator('.project-modal__download-copy small').innerText())
      .replace(/\s+/g, ' ')
      .trim(),
    rowHeight: rowBox ? Math.round(rowBox.height) : null,
    actionWidth: actionBox ? Math.round(actionBox.width) : null,
  })

  if (index === 0) {
    await page.screenshot({
      path: path.join(outputDir, 'project-modal-download-1920.png'),
    })
  }

  if (title === '手势粒子场') {
    const downloadPath = path.join(outputDir, 'qa-gesture-particles.mp4')
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      action.click(),
    ])
    await download.saveAs(downloadPath)
    projectResults[index].download = {
      suggestedFilename: download.suggestedFilename(),
      bytes: fs.statSync(downloadPath).size,
    }
    fs.rmSync(downloadPath, { force: true })
  }

  await page.locator('.project-modal__close').click()
  await page.waitForTimeout(180)
}

await page.setViewportSize({ width: 1440, height: 900 })
await page.waitForTimeout(300)
await cards.first().click()
await page.waitForTimeout(250)
const compactRow = page.locator('.project-modal__download-row')
const compactAction = page.locator('.project-modal__download-action')
const compactRowBox = await compactRow.boundingBox()
const compactActionBox = await compactAction.boundingBox()
await page.screenshot({
  path: path.join(outputDir, 'project-modal-download-1440.png'),
})
await page.locator('.project-modal__close').click()

console.log(
  JSON.stringify(
    {
      projectResults,
      compactViewport: {
        rowHeight: compactRowBox ? Math.round(compactRowBox.height) : null,
        actionWidth: compactActionBox ? Math.round(compactActionBox.width) : null,
      },
      errors,
    },
    null,
    2,
  ),
)

await browser.close()
