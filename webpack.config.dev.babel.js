import merge from 'webpack-merge' // Merges webpack configurations

import baseWebpackConfig from './webpack.config.base.babel.js'

const PORT = process.env.PORT_PUBLIC || 3000
const API_BASE = process.env.API_BASE || 'http://localhost:8080' // This is the url for server API

module.exports = (env) => {
  return merge(
    baseWebpackConfig,
    {
      mode: 'development',
      devtool: 'eval-source-map',
      devServer: {
        port: PORT,
        stats: 'minimal',
        allowedHosts: [],
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: '/index.html' }
          ]
        },
        proxy: {
          '/api': {
            target: API_BASE,
            changeOrigin: true
          }
        }
      }
    }
  )
}
