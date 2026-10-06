import { defineConfig, loadEnv } from 'vite'
import { cwd } from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), 'API_PROXY_TARGET')
  const target = env.API_PROXY_TARGET || 'https://coralshop-backend-production.up.railway.app'
  const proxy = {
    '/api': {
      target,
      changeOrigin: true,
    },
  }

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  }
})
