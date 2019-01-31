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
    ignoreCssWarnings(config);
    // 生成 css.d.ts
    ['css', 'less', 'scss', 'sass', 'stylus', 'postcss'].forEach(rule => {
      ['normal-modules'].forEach(oneOf => {
        config.module
          .rule(rule)
          .oneOf(oneOf)
          .uses.delete('css-loader');
        config.module
          .rule(rule)
          .oneOf(oneOf)
          .use('typings-for-css-modules-loader')
          .before('postcss-loader')
          .loader('typings-for-css-modules-loader')
          .options({
            modules: true,
            namedExport: true,
            camelCase: true,
            importLoaders: 2,
            localIdentName: process.env.NODE_ENV !== 'production' ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
          });
      });
    });
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
