import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin' // Generates index.html with imported js and css
import MiniCssExtractPlugin from 'mini-css-extract-plugin' // Used to extract css into different files
import StyleLintPlugin from 'stylelint-ext-webpack-plugin' // Linter for scss files

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
    extensions: ['.js', '.json', '.jsx']
  },
  entry: {
    app: resolveSrcPath('client/App.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'build/dist'),
    publicPath: '/',
    filename: devMode ? 'assets/js/[name].[hash:7].js' : 'assets/js/[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader', // Runs eslint before trying to compile js
        options: {
          globals: ['API_BASE', 'BUILD_TIME']
        }
      },
      {
        test: /\.jsx?$/,
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
        loader: 'file-loader',
        options: {
          context: resolveSrcPath('client'),
          limit: 10000,
          name : devMode ? 'assets/img/[name].[hash:7].[ext]' : 'assets/img/[name].[contenthash].[ext]'
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
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

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
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss'
    }),
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })
  ],
  stats: 'minimal'
}
