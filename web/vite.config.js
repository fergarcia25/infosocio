import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ===== PRODUCCIÓN =====
  base: '/',
  // ===== DESARROLLO LOCAL =====
  // base: '/web/',
  plugins: [
    react(),
    {
      name: 'inject-entry',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html.replace(
            '</body>',
            '<script type="module" src="/src/main.jsx"></script>\n</body>'
          );
        },
      },
    },
  ],
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
