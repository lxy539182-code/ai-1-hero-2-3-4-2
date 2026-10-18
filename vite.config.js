import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { portfolioFilmDownloads } from './film-downloads-plugin.js'

export default defineConfig({
  base: './',
  plugins: [react(), portfolioFilmDownloads()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
