const path = require('path')
const commonConfig = require('./common.config')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge(commonConfig, {
	mode: 'production',
})