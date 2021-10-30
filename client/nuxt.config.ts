import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  vueMeta: {
    htmlAttrs: {
      lang: 'zh-CN'
    }
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        }
      }
    },
  },
  server: {
    port: 4000
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
})
