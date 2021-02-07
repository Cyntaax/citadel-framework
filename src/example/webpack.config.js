const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
const glob = require("glob")
const fs = require("fs")

const entry = require("webpack-glob-entry")

const gl = glob.sync("./main/modules/**/client/index.ts", {})

const sgl = glob.sync("./main/modules/**/server/index.ts", {})

console.log(gl)

const client_config = {
    entry: [
        './main/client/index.ts',
        ...gl,
        './main/modules/index.ts'
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: true,
                    keep_classnames: true,
                    extractComments: 'all',
                    compress: {
                        // drop_console: true,
                    },
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
};

const server_config = {
    entry: [
        './src/main/server/index.ts',
        ...sgl
    ],
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist/server'),
    },
};


module.exports = [client_config, server_config]
