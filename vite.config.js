import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/wtwr_frontend/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
}))
