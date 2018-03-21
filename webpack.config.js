var path = require("path");
var webpack = require("webpack");
var htmlTemplate = require("html-webpack-plugin");
var Ex = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var urlPlugin = require("url-loader");


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports={
	devtool: 'eval-source-map',
	entry:__dirname+"/app/main.js",
	output:{
		filename:"src/[name].js",
		path:__dirname+"/public",
		publicPath: '/webpack/public/',
	},
	devServer:{
		contentBase:"./public",
		historyApiFallback:false,
		inline:true
	},
	resolve:{
		extensions:['.js', '.vue', '.json'],
		alias: {
	      'vue$': 'vue/dist/vue.esm.js',
	      '@': resolve('src'),
	    }
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:"babel-loader"
				},
				exclude:/node_modules/
			},{
				test:/\.css$/,
				use:Ex.extract({
		          fallback: "style-loader",
		          use: [{
		          	loader:"css-loader",
		          	options:{
		          		minimize:true
		          	}
		          }]
		        })
			},
			{
				test:/\.(png|jpg)$/,
				use:{
					loader:"url-loader?limit=8080&name=imge/[hash:8].[name].[ext]"
				}
			},{
				test: /\.vue$/,
		        use:{
		        	loader:"vue-loader"
		        }
			}
		]
	},
	plugins:[
		new htmlTemplate({
			template:__dirname+"/app/index.tempt.html",
			title:"webpack test",
			inject:"body"
		}),
		new Ex("css/[name].css"),
		new UglifyJsPlugin
	]
}
