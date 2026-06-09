import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              return res.end(JSON.stringify({ error: 'Method not allowed' }))
            }
            const key = env.GROQ_API_KEY
            if (!key) {
              res.statusCode = 500
              return res.end(JSON.stringify({ error: 'GROQ_API_KEY not set in .env.local' }))
            }
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { messages, model, max_tokens, temperature } = JSON.parse(body)
                const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    model:       model       || 'llama-3.1-8b-instant',
                    messages:    messages    || [],
                    max_tokens:  max_tokens  || 300,
                    temperature: temperature || 0.7,
                  }),
                })
                const data = await upstream.json()
                res.statusCode = upstream.status
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              } catch {
                res.statusCode = 500
                res.end(JSON.stringify({ error: 'Upstream request failed' }))
              }
            })
          })
        },
      },
    ],
  }
})
