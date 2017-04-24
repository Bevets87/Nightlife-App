const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'client') + '/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: false,
      sourcemap: false,
      beautify: false,
      dead_code: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'client'),
        loaders: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.mp4$/,
        loader: 'url-loader?limit=10000&mimetype=video/mp4'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
