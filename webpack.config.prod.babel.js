import path from 'path'

import webpack from 'webpack'
import merge from 'webpack-merge' // Merges webpack configurations
import { CleanWebpackPlugin } from 'clean-webpack-plugin' // Cleans build directory before building assets
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin' // Minimize css files
import TerserPlugin from 'terser-webpack-plugin' // Minimize js files

import baseWebpackConfig from './webpack.config.base.babel.js'

const resolveRootPath = (p) => path.resolve(__dirname, p)

module.exports = (env) => {
  return merge(
    baseWebpackConfig,
    {
      mode: 'production',
      devtool: 'nosources-source-map',
      optimization: {
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin()
        ]
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [resolveRootPath('build')]
        }),
        new webpack.optimize.AggressiveMergingPlugin() // merge chunks
      ]
    }
  )
}
