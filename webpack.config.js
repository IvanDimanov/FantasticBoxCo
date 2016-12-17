'use strict'

const path = require('path')

const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')

const developmentPort = 8080

/* Secure Webpack-Dashboard standalone calls */
const plugins = []
if (process.env.dashboard) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  )
}

const entries = {
  application: ['./front-end/application']
}

/* Secure Webpack Hot reload when we have standalone calls */
if (process.env.dashboard) {
  Object.keys(entries)
    .forEach((entryName) => entries[entryName].push(
      `webpack-dev-server/client?http://127.0.0.1:${developmentPort}`,
      'webpack/hot/only-dev-server'
    ))
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve('./public'),
    filename: 'js/[name].bundle.js'
  },

  cache: process.env.NODE_ENV === 'local',
  clearBeforeBuild: process.env.NODE_ENV === 'local',

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|theme)/,
      loader: 'babel',
      query: {
        cacheDirectory: process.env.NODE_ENV === 'local',
        presets: ['react', 'latest']
      }
    }]
  },

  plugins: plugins,

  devServer: {
    contentBase: './public',
    port: developmentPort,
    stats: {
      colors: true
    }
  }
}
