
module.exports = {
  outputDir: 'dist',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve(__dirname, 'src/assets/scss/libs/*.scss')],
    },
  },
  transpileDependencies: ['vuex-module-decorators'],
}
