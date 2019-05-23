import merge from 'webpack-merge' // Merges webpack configurations
import path from 'path'
import baseWebpackConfig from './webpack.config.base.babel.js'
import CleanWebpackPlugin from 'clean-webpack-plugin' // Cleans build directory before building assets
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin' // Used to minimize css files

const resolveRootPath = (p) => path.resolve(__dirname, p)

module.exports = (env) => {
  return merge(
    baseWebpackConfig,
    {
      mode: 'production',
      devtool: 'nosources-source-map',
      optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [ resolveRootPath('build') ]
        })
      ]
    }
  )
}
