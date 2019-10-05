const path = require('path')
const commonConfig = require('./webpack.config')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(commonConfig, {
	mode: 'development',
	devServer: {
		clientLogLevel: 'warning',
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		port: 1234,
		open: true,
		overlay: { warnings: false, errors: true },
	},
})