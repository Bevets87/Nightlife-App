const webpack = require('webpack')
const path = require('path')

const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: path.join(__dirname, 'client'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/[name].[chunkHash].js',
    publicPath: '/'
  },
  mode: 'production',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new OptimizeCSSAssetsWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[contentHash].css',
    }),
    new UglifyJSWebpackPlugin(),
    new BundleAnalyzerPlugin()

  ]

}
