const path = require('path')
const commonConfig = require('./common.config')
const webpackMerge = require('webpack-merge')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = webpackMerge(commonConfig, {
	mode: 'development',
	plugins: [
		new BundleAnalyzerPlugin()
	],
	devServer: {
		clientLogLevel: 'warning',
		contentBase: path.join(__dirname, '../dist'),
		compress: true,
		port: 1234,
		open: true,
		overlay: { warnings: false, errors: true },
	},
})