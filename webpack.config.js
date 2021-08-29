const path = require ( 'path' )
const webpack = require ( 'webpack' )
const HtmlWebpackPlugin = require ( 'html-webpack-plugin' )

module.exports = {
    entry: './src/index.js' ,
    module: {
        rules: [
            {test: /\.svg$/ , use: 'svg-inline-loader'} ,
            {test: /\.css$/ , use: ['style-loader' , 'css-loader']} ,
            {test: /\.(js)$/ , use: 'babel-loader'} ,
            {
                test: /\.s[ac]ss$/i ,
                use: [
                    "style-loader" ,
                    "css-loader" ,
                    "sass-loader" ,
                ] ,
            } ,
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './',
                            name: `icons/[name].[ext]`,
                        }
                    },
                ],
            },
        ] ,
    } ,
    output: {
        path: path.resolve ( __dirname , 'dist' ) ,
        filename: 'index_bundle.js'
    } ,
    plugins: [
        new HtmlWebpackPlugin ( {
            template: "./src/index.html" ,
        } ) ,
        new webpack.DefinePlugin ( {
            "process.env": {
                NODE_ENV: JSON.stringify ( "development" ) ,
            } ,
        } ) ,
    ] ,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}