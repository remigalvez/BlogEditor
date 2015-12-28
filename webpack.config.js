var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './client.js'),
	output: {
		filename: 'public/bundle.js'
	},
	module: {
		loaders: [
			{
				exclude: /(node_modules|server.js)/,
				loader: 'babel',
				query: {
					presets:['react','es2015']
				}
			}
		]
	}
}