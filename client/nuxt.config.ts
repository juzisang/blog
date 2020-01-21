import NuxtConfig from '@nuxt/config'

const config: NuxtConfig = {
  srcDir: './src',
  css: ['normalize.css', '@/assets/styles/reset.scss', '@/assets/styles/base.scss'],
  server: {
    port: 9000,
    host: '0.0.0.0'
  }
}

export default config
