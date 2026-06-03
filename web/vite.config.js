import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/web/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/admin/api': {
        target: 'http://infosocio.test',
        changeOrigin: true,
      },
    },
  },
})
