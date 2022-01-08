import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin' // Generates index.html with imported js and css
import MiniCssExtractPlugin from 'mini-css-extract-plugin' // Used to extract css into different files
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin' // Linter for scss files

const buildTime = new Date().getTime()
const devMode = process.env.NODE_ENV !== 'production'
const resolveSrcPath = (p) => path.resolve(__dirname, `src/${p}`)

module.exports = {
  resolve: {
    alias: {
      actions: resolveSrcPath('client/actions'),
      components: resolveSrcPath('client/components'),
      constants: resolveSrcPath('client/constants'),
      containers: resolveSrcPath('client/containers'),
      middleware: resolveSrcPath('client/middleware'),
      reducers: resolveSrcPath('client/reducers'),
      store: resolveSrcPath('client/store')
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
  },
  entry: {
    app: resolveSrcPath('client/App.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: '/',
    filename: 'assets/js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          // Uses style-loader to add css to DOM, uses MiniCssExtractPlugin to extract css separately in production
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /(png|svg|jpg|ico|woff|woff2|ttf|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[contenthash].[ext]'
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // Split out libraries into their own js file
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const contextMatch = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
            const packageName = contextMatch ? contextMatch[1] : ''

            return `vendor.${packageName.replace('@', '')}`
          },
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_BASE: `'${process.env.API_BASE || 'http://localhost:8080'}'`,
      BUILD_TIME: buildTime,
      'process.env': {
        devMode
      }
    }),
    new HtmlWebpackPlugin({
      title: '',
      template: resolveSrcPath('client/index.ejs')
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: ['src/**/*.scss']
    }),
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })
  ],
  stats: 'minimal'
}
