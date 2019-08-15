module.exports = {
  chainWebpack: config => {
    'use strict';

    config.module
      .rule('tsx')
      .test(/\.tsx$/)
      .use('vue-jsx-hot-loader')
      .before('babel-loader')
      .loader('vue-jsx-hot-loader');
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeViewBox: false }
          ],
          removeViewBox: false
        }
      })
      .end();
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/var.scss";`
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#0390FF',
          'border-radius-base': '3px',
          'border-radius-sm': '2px',
          'shadow-color': 'rgba(0,0,0,0.05)',
          'shadow-1-down': '4px 4px 40px @shadow-color',
          'border-color-split': '#f4f4f4',
          'border-color-base': '#e5e5e5',
          'font-size-base': '13px',
          'text-color': '#666'
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api/', // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
