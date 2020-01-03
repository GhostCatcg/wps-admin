const { resolve } = require('path')
// 是否是 hybridApp 项目
const IS_APP = false

const APP_NAME = '顽皮斯 - CG工作室'

module.exports = {
  lintOnSave: false,// 暂时关闭ESLINT
  productionSourceMap: false,
  publicPath: IS_APP ? './' : '/',
  outputDir: IS_APP ? `dist/${APP_NAME}` : 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')],
    },
  },
  transpileDependencies: ['vuex-module-decorators'],
}
