import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-public-subdirectories',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0]
          if (url && url !== '/' && url.endsWith('/')) {
            const filePath = path.join(__dirname, 'public', url.slice(1), 'index.html')
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              res.end(fs.readFileSync(filePath, 'utf-8'))
              return
            }
          }
          next()
        })
      }
    }
  ],
  server: { port: 3000 },
})
