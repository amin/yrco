import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  preview: {
    allowedHosts: true,
    proxy: {
      '/auth': { target: process.env.API_URL, changeOrigin: true },
      '/users': { target: process.env.API_URL, changeOrigin: true },
      '/traits': { target: process.env.API_URL, changeOrigin: true },
    },
  },
})
