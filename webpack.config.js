const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {resolve} = require('path')

module.exports = {
  entry: {
    'placeholder-module': resolve(__dirname, 'src', 'placeholder-module.ts'),
    'placeholder-module.min': resolve(__dirname, 'src', 'placeholder-module.ts')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'PlaceholderModule',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.ts$/,
      include: [resolve(__dirname, 'src')],
      use: [
        {
          loader: 'babel-loader',
          query: {
            presets: [['es2015', {modules: false}]]
          }
        },
        'ts-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['.ts']
  },
  externals: {
    quill: {
      commonjs: 'quill',
      commonjs2: 'quill',
      amd: 'quill',
      root: 'Quill'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([{from: 'src/toolbar.css', to: 'toolbar.css'}]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js/,
      compress: true,
      sourceMap: true
    })
  ]
}
