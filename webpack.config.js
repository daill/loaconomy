const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./public/js/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env', 'react'] }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, "./public/js"),
        publicPath: "./public/js/",
        filename: "bundle.js"
    },
    /*devServer: {
        contentBase: path.join(__dirname, "html/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    }, */
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
};