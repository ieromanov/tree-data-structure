const path = require('path')
const commonConfig = require('./common.config')
const webpackMerge = require('webpack-merge')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = webpackMerge(commonConfig, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'tds.js',
		library: 'tree-data-structure',
		libraryTarget: 'umd',
		globalObject: 'this'
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			test: /\.js(\?.*)?$/i,
			extractComments: false,
			terserOptions: {
				output: {
					comments: false,
				},
			},
		})],
	},
})