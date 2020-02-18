module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['last 4 versions', 'IE 10']
				},
				useBuiltIns: 'usage',
				corejs: 3
			}
		]
	]
}
