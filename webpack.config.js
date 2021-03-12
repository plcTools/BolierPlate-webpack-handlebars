const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
module.exports = {

    entry: {
        index: [
          "@babel/polyfill",
          './src/index.js'
        ],
      },
    output: {
        path: path.resolve(__dirname, 'build'),/* name of build folder */
        filename: 'bundle.js',/* name of output file on build */
        clean: true,/* clean old folder ej: /dist  */
    },
    devServer: {
        port: 5000
    },
    module: {
        rules: [
            /* loader de babel para usar codigo moderno en javascript */
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,/* css file extract in build */
                    'css-loader',
                    'sass-loader'/* sass files */
                    /* 'style-loader', */
                ]
            },

            {
                test: /\.handlebars/,
                loader: 'handlebars-loader'
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,/* photo parser and include in build */
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/images',
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'image-webpack-loader',/* photo quality reducer */
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.handlebars',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.css',

        })
    ]
}