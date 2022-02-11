const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  
  devServer: {
    static: {
      directory: PATHS.dist
    },    
    watchFiles: ['src/**/*.pug', 'src/**/*.scss'],
    open: false,
    port: 1337,
    historyApiFallback: true
  },
});
