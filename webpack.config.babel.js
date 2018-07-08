const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')
const baseConfig = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCSSExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer')
              ]),
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ path.join(__dirname, 'client', 'styles') ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['video:src']
            }
          }
        ]
      },
      {
        test: /\.mp4$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/videos/',

            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/',

            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HTMLWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'client/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new HTMLWebpackHarddiskPlugin()
  ]

}

module.exports = (process.env.NODE_ENV === 'production') 
  ? merge(baseConfig, prodConfig) 
  : merge(baseConfig, devConfig)



