import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Pokemon-Explorer-Project'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${repositoryName}/` : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
