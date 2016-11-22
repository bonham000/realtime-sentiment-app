import path from 'path'
import webpack from 'webpack'

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client?reload=true',
		path.join(__dirname, 'client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js/,
				include: path.join(__dirname, 'client'),
				loaders: [ 'babel' ]
			},
			{
				test: /\.scss/,
				include: path.join(__dirname, 'client/theme'),
				loaders: [ 'style', 'css', 'sass' ]
			}
		]
	}
}