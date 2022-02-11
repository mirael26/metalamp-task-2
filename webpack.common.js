const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: PATHS.dist,
    clean: true,  
  },
  
  module: {
    rules: [
      {
        test:/\.(s*)css$/,
        use: [
          miniCss.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
              exports: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: 'app.css'
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/uikit.pug`,
      filename: 'uikit.html',
      inject: true
    }),
  ],
};