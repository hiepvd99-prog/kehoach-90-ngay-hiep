import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      // Trang Marketing 90 ngày do Express phục vụ (public/marketing.html).
      // Không proxy thì Vite trả về index.html -> iframe nạp lại chính app này.
      '/marketing-page': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/marketing-assets': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
