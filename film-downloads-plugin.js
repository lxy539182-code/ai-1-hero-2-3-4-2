import fs from 'node:fs'

const filmLibrary = new Map([
  [
    '/downloads/coffee-film.mp4',
    {
      file: 'E:/AIGC剧本/zuop/AIGC/创意广告视频/创意咖啡广告.mp4',
      name: '李鑫宇_从种子到一杯_完整成片.mp4',
    },
  ],
  [
    '/downloads/neon-fight.mp4',
    {
      file: 'E:/AIGC剧本/zuop/AIGC/打斗30s/赛博朋克风打斗.mp4',
      name: '李鑫宇_霓虹雨巷_完整成片.mp4',
    },
  ],
  [
    '/downloads/moka-extraction.mp4',
    {
      file: 'E:/AIGC剧本/zuop/新建文件夹 (2)/摩卡壶（广告类ALGC).mp4',
      name: '李鑫宇_摩卡壶_萃取时刻_完整成片.mp4',
    },
  ],
  [
    '/downloads/blank-story.mp4',
    {
      file: 'E:/AIGC剧本/zuop/ALGC/空白（故事类ALGC作品）.mp4',
      name: '李鑫宇_空白_完整成片.mp4',
    },
  ],
  [
    '/downloads/gesture-particles.mp4',
    {
      file: 'E:/AIGC剧本/zuop/td交互/手势控制.mp4',
      name: '李鑫宇_手势粒子场_完整演示.mp4',
    },
  ],
  [
    '/downloads/yanduo-story.mp4',
    {
      file: 'E:/AIGC剧本/zuop/情景故事/烟堕.mp4',
      name: '李鑫宇_烟堕_完整成片.mp4',
    },
  ],
])

function parseSingleRange(rangeHeader, size) {
  if (!rangeHeader || rangeHeader.includes(',')) {
    return null
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim())
  if (!match) {
    return null
  }

  const [, rawStart, rawEnd] = match
  if (rawStart === '' && rawEnd === '') {
    return null
  }

  if (rawStart === '') {
    const suffixLength = Number(rawEnd)
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) {
      return null
    }

    return {
      start: Math.max(size - suffixLength, 0),
      end: size - 1,
    }
  }

  const start = Number(rawStart)
  const end = rawEnd === '' ? size - 1 : Number(rawEnd)
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    start >= size ||
    end < start
  ) {
    return null
  }

  return {
    start,
    end: Math.min(end, size - 1),
  }
}

function attachmentDisposition(name) {
  const fallback = name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_')
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(name)}`
}

function filmDownloadMiddleware(req, res, next) {
  const pathname = (req.url || '').split('?')[0]
  const download = filmLibrary.get(pathname)
  if (!download) {
    if (pathname.startsWith('/downloads/')) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('Unknown film download.')
      return
    }
    next()
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.setHeader('Allow', 'GET, HEAD')
    res.end('Method Not Allowed')
    return
  }

  let stats
  try {
    stats = fs.statSync(download.file, { throwIfNoEntry: false })
  } catch {
    stats = null
  }

  if (!stats?.isFile()) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Film file is not available on this machine.')
    return
  }

  const size = stats.size
  const rangeHeader = req.headers.range
  const range = parseSingleRange(rangeHeader, size)

  res.setHeader('Content-Type', 'video/mp4')
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Disposition', attachmentDisposition(download.name))
  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate')
  res.setHeader('X-Content-Type-Options', 'nosniff')

  if (rangeHeader && !range) {
    res.statusCode = 416
    res.setHeader('Content-Range', `bytes */${size}`)
    res.end()
    return
  }

  if (range) {
    res.statusCode = 206
    res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${size}`)
    res.setHeader('Content-Length', range.end - range.start + 1)
  } else {
    res.statusCode = 200
    res.setHeader('Content-Length', size)
  }

  if (req.method === 'HEAD') {
    res.end()
    return
  }

  const stream = fs.createReadStream(download.file, range || undefined)
  stream.on('error', () => {
    if (!res.headersSent) {
      res.statusCode = 500
      res.end('Unable to read the film file.')
      return
    }
    res.destroy()
  })
  res.on('close', () => stream.destroy())
  stream.pipe(res)
}

export function portfolioFilmDownloads() {
  return {
    name: 'portfolio-film-downloads',
    configureServer(server) {
      server.middlewares.use(filmDownloadMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(filmDownloadMiddleware)
    },
  }
}
