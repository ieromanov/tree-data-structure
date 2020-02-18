const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'tds.js',
	},
	plugins: [
		new BundleAnalyzerPlugin()
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			}
		]
	}
}