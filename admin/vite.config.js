import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ===== PRODUCCIÓN =====
  base: '/admin/',
  // ===== DESARROLLO LOCAL =====
  // base: '/admin/',
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
    port: 5174,
    proxy: {
      '/admin/api': {
        target: 'http://localhost/infosocio',
        changeOrigin: true,
      },
    },
  },
})
