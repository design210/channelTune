const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

//const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
                       @import "@/styles/mixin.scss";
                       @import "@/styles/reset.scss";
                       @import "@/styles/common.scss";
                   `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
  },
  //
  // configureWebpack: {
  // 	devtool: 'source-map',
  // },

  configureWebpack: (config) => {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 900000,
            maxSize: 1000000,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 900000,
            maxSize: 1000000,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest",
            minSize: 900000,
            maxSize: 1000000,
          },
        },
      },
    };
    config.plugins.push(new SpeedMeasurePlugin());
  },
};
