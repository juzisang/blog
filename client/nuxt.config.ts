import NuxtConfig from '@nuxt/config'

const config: NuxtConfig = {
  server: {
    port: 9000
  },
  srcDir: './src',
  build: {
    loaders: {
      css: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[local]_[hash:base64:5]'
      }
    }
  }
}

export default config
