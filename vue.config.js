module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 192
          })
        ]
      }
    }
  },
  // chainWebpack: config => { // ①这里是配置的部分
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // },
  configureWebpack: () => ({
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true
          },
          runtimeChunk: {
            name: "manifest"
          }
        }
      }
    }
  })
  // chainWebpack: config => {
  //   // 移除prefetch插件
  //   config.plugin.delete('prefetch')

  //   config.plugin('prefetch').tap(options => {
  //     options[0].fileBlacklist = options[0].fileBlacklist || []
  //     options[0].fileBlacklist.push(/myasynRoute(.)+?\.js$/)
  //     return options
  //   })
  // }
};
