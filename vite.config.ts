import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import type { ServerResponse } from 'node:http'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const manifestPath = resolve(projectRoot, 'src/slides/deckManifest.ts')

function readDeckManifest() {
  const content = readFileSync(manifestPath, 'utf8')
  return Array.from(content.matchAll(/'([^']+)'/g), (match) => match[1])
}

function writeDeckManifest(slideIds: string[]) {
  const nextContent = `export const deckManifest = [
${slideIds.map((slideId) => `  '${slideId}',`).join('\n')}
] as const
`

  writeFileSync(manifestPath, nextContent, 'utf8')
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown,
) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

function deckEditorPlugin(): Plugin {
  return {
    name: 'deck-editor-plugin',
    configureServer(server) {
      server.middlewares.use('/__deck-editor', async (req, res, next) => {
        if (!req.url) {
          next()
          return
        }

        if (req.method === 'DELETE' && req.url.startsWith('/slides/')) {
          const slideId = decodeURIComponent(req.url.replace('/slides/', ''))
          const currentIds = readDeckManifest()

          if (currentIds.length <= 1) {
            sendJson(res, 400, { error: 'Cannot delete the last slide.' })
            return
          }

          if (!currentIds.includes(slideId)) {
            sendJson(res, 404, { error: 'Slide not found in manifest.' })
            return
          }

          writeDeckManifest(currentIds.filter((currentId) => currentId !== slideId))
          sendJson(res, 200, { ok: true })
          return
        }

        if (req.method === 'POST' && req.url === '/reorder') {
          const chunks: Uint8Array[] = []

          for await (const chunk of req) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
          }

          const payload = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
            orderedIds?: string[]
          }
          const currentIds = readDeckManifest()
          const orderedIds = payload.orderedIds ?? []
          const sameSet =
            orderedIds.length === currentIds.length &&
            orderedIds.every((slideId) => currentIds.includes(slideId))

          if (!sameSet) {
            sendJson(res, 400, { error: 'Reorder payload must match current manifest.' })
            return
          }

          writeDeckManifest(orderedIds)
          sendJson(res, 200, { ok: true })
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), deckEditorPlugin()],
})
