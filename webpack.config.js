const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {resolve} = require('path')

module.exports = {
  entry: resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
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
  plugins: [
    new CopyWebpackPlugin([{from: 'src/toolbar.css', to: 'toolbar.css'}])
  ]
}
