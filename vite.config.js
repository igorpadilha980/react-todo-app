import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const urlBase = globalThis.process.env.DEPLOY_BASE_URL

// https://vitejs.dev/config/
export default defineConfig({
  base: urlBase,
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
