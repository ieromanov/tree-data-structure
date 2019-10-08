const signale = require('signale')
const webpack = require('webpack')
const config = require('./config/prod.config')

signale.start('start build...')

webpack(config, (error, stats) => {
	if (stats.hasErrors()) {
		signale.error(`build faild with error\n\n ${stats.compilation.errors}\n\n`)
		process.exit(1)
	}
	
	signale.success(`build complete, time: ${stats.endTime - stats.startTime} ms`)
})