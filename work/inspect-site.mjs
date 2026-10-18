import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const runtimeModules =
  'C:/Users/az/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
const { chromium } = require(`${runtimeModules}/playwright`)

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

const messages = []
const failures = []

page.on('console', (message) => {
  if (message.type() === 'error' || message.type() === 'warning') {
    messages.push(`${message.type()}: ${message.text()}`)
  }
})
page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`))
page.on('requestfailed', (request) => {
  failures.push(`${request.url()} :: ${request.failure()?.errorText}`)
})

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1500)

await page.screenshot({
  path: path.join(outputDir, '01-hero-1920.png'),
})

await page.screenshot({
  path: path.join(outputDir, '00-full-page.png'),
  fullPage: true,
})

for (const [id, filename] of [
  ['about', '02-about-1920.png'],
  ['work', '03-work-1920.png'],
  ['capabilities', '04-capabilities-1920.png'],
]) {
  await page.evaluate((sectionId) => {
    const section = document.getElementById(sectionId)
    window.scrollTo({ top: section.offsetTop - 72, behavior: 'instant' })
  }, id)
  await page.waitForTimeout(1300)
  await page.screenshot({
    path: path.join(outputDir, filename),
  })
  if (id === 'about') {
    await page.locator('.identity-plate').screenshot({
      path: path.join(outputDir, '02b-identity.png'),
    })
  }
}

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(800)
await page.screenshot({
  path: path.join(outputDir, '05-contact-1920.png'),
})

await page.locator('.project-card').first().click()
await page.waitForTimeout(500)
await page.screenshot({
  path: path.join(outputDir, '06-project-modal.png'),
})
await page.locator('.project-modal__close').click()

await page.setViewportSize({ width: 1440, height: 900 })
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({
  path: path.join(outputDir, '07-hero-1440.png'),
})

const metrics = await page.evaluate(() => {
  const heroTitle = document.querySelector('.hero__title')
  const titleStyle = heroTitle ? getComputedStyle(heroTitle) : null
  const video = document.querySelector('.hero__video')
  const images = [...document.images].map((image) => ({
    src: image.getAttribute('src'),
    loaded: image.complete && image.naturalWidth > 0,
  }))

  return {
    viewport: [window.innerWidth, window.innerHeight],
    scrollWidth: document.documentElement.scrollWidth,
    bodyHeight: document.body.scrollHeight,
    containerWidth: document.querySelector('.container')?.getBoundingClientRect().width,
    heroTitleSize: titleStyle?.fontSize,
    heroTitleFont: titleStyle?.fontFamily,
    projectCount: document.querySelectorAll('.project-card').length,
    sections: Object.fromEntries(
      ['home', 'about', 'work', 'capabilities', 'contact'].map((id) => {
        const element = document.getElementById(id)
        return [
          id,
          {
            offsetTop: element?.offsetTop,
            height: element?.offsetHeight,
          },
        ]
      }),
    ),
    contactFooter: (() => {
      const footer = document.querySelector('.site-footer')
      if (!footer) return null
      const rect = footer.getBoundingClientRect()
      return {
        top: rect.top,
        bottom: rect.bottom,
        viewportHeight: window.innerHeight,
      }
    })(),
    videoSrc: video?.currentSrc,
    videoReadyState: video?.readyState,
    videoPaused: video?.paused,
    images,
  }
})

console.log(JSON.stringify({ metrics, messages, failures }, null, 2))
await browser.close()
