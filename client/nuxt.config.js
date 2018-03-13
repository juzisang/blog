module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '橘子的Blog',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'keywords', content: 'php,blog,linux,javascript,html5,css,vue,android,python,nodejs'},
      {name: 'description', content: '没有什么...'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'https://avatars2.githubusercontent.com/u/14973323?s=460&v=4'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#eb5055'},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-runtime'
      ],
      comments: true
    }
  },

  css: [
    {src: '~assets/scss/app.scss', lang: 'scss'}
  ]
}
