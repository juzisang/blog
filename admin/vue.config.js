const path = require('path');

module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    // config.resolve.alias.set("src", path.resolve(__dirname, "src"));
    // 热重载
    if (process.env.NODE_ENV !== 'production') {
      config.module
        .rule('tsx')
        .test(/\.tsx$/)
        .use('vue-jsx-hot-loader')
        .before('babel-loader')
        .loader('vue-jsx-hot-loader');
    }
    // bundle-analyzer
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
    // 忽略提示
    // ignoreCssWarnings(config);
    // css to typings-for-css-modules-loader
    ['css', 'less', 'scss', 'sass', 'stylus', 'postcss'].forEach(rule => {
      // rules for *.module.* files
      const cssRule = config.module
        .rule(rule)
        .oneOf('normal-modules')
        .uses.get('css-loader')
        .set('loader', 'typings-for-css-modules-loader');
    });
    // svg loader
    // const svgRule = config.module.rule('svg');
    // svgRule.uses.clear();
    // svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  css: {
    loaderOptions: {
      css: {
        namedExport: true,
        camelCase: true,
        localIdentName: process.env.NODE_ENV !== 'production' ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};

/**
 * 忽略css警告
 */
function ignoreCssWarnings(config) {
  // Define the class
  class FilterPlugin {
    constructor(options) {
      this.options = options;
    }
    apply(compiler) {
      compiler.hooks.afterEmit.tap('FilterPlugin', compilation => {
        compilation.warnings = compilation.warnings.filter(warning => !this.options.filter.test(warning.message));
      });
    }
  }
  config
    .plugin('filter-css-warnings-plugin')
    .use(
      new FilterPlugin({
        filter: /Conflicting order between:/,
      }),
    )
    .end();
}
