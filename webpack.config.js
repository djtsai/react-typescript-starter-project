"use strict"

const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const SOURCE_DIR = path.resolve(__dirname, 'src')
const PUBLIC_DIR = path.resolve(__dirname, 'public')
const BUILD_DIR = path.resolve(__dirname, 'public/dist')

const environment = process.env.NODE_ENV || "production"

module.exports = {
    entry: SOURCE_DIR + "/main.jsx",
    output: {
        publicPath: "/dist/",
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            actions: SOURCE_DIR + "/actions",
            components: SOURCE_DIR + "/components",
            constants: SOURCE_DIR + "/constants",
            containers: SOURCE_DIR + "/containers",
            reducers: SOURCE_DIR + "/reducers",
            server: SOURCE_DIR + "/server"
        },
        extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(environment)
            }
        }),
        new ExtractTextPlugin("bundle.css")
    ],
    module: {
        loaders : [
            {
                test: /\.jsx?/,
                include: SOURCE_DIR,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(["css-loader"])
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
            }
        ]
    },
    devServer: {
        port:3000,
        historyApiFallback: true,
        inline: true,
        contentBase: PUBLIC_DIR
    }
}
