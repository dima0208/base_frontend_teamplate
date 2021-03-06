var path = require('path');
const webpack = require('webpack');

const distFolderPath = './';

/*Plugins*/
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/********/

/*Variables*/
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
/***********/

module.exports = {
	mode: NODE_ENV,

	entry: {
		main: __dirname + '/app/js/main.js'
	},
	
	output: {
		path: __dirname + '/dist/',
		publicPath: '/',
		filename: '[name].js'
	},

	watchOptions: {
		aggregateTimeout: 200,
		ignored: /node_modules/
	},

	module: {
		rules: [
			{
                test: /\.(woff(2)?|ttf|eot|svg|otf|jpg|png|jpeg$)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: distFolderPath,
                    }
                }]
            },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true }
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true }
					}
				]
			}
		]
	},

	plugins: [
		new WriteFilePlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css"
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],

	devServer: {
		contentBase: __dirname + '/',
		publicPath: '/',
		compress: true,
		open: true,
		overlay: true,
		inline: true
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
			  	test: /\.js(\?.*)?$/i
			}),
		],
	},

	devtool: "cheap-source-map"
};