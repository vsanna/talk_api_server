const autoprefixer = require('autoprefixer');
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

var webpack = require('webpack')

module.exports = {
    context: __dirname + "/app/assets/javascripts",
    entry: "./main.jsx",
    // postcss: [ autoprefixer( AUTOPREFIXER_BROWSERS ) ],
    output: {
        path: __dirname + "/app/assets/javascripts",
        filename: "./build/main.js"
    },
    devServer: {
        contentBase: '/app/assets',
        port: 4000
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx|\.vue)$/,
                exclude: /(node_modules|app\/assets\/javascripts\/build)/,
                use: "eslint-loader",
                enforce: 'pre', // preLoader
                // options: {
                //     configFile: './eslintrc'
                // }
            },
            {
                test: /(\.js|\.jsx|\.vue)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                // options: {
                //     loaders: {
                //         css: ExtractTextPlugin.extract("css"),
                //         // you can also include <style lang="less"> or other langauges
                //         less: ExtractTextPlugin.extract("css!scss")
                //     },
                //     cssModules: {
                //         // overwrite local ident name
                //         localIdentName: '[path][name]---[local]---[hash:base64:5]',
                //         // enable camelCase
                //         camelCase: true
                //     }
                // }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
        ]
    },
    plugins: [
        // new ExtractTextPlugin("style.css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: './.eslintrc'
                },
                // vue: {
                // }
            }// webpack2にloaderが智罃するまではこれまでのカスタム属性(ex: vue, eslint)はココに置く
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            }
        }),
    ],
    devtool: 'inline-source-map',
    watch: true
};
