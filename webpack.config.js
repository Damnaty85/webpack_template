const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");


module.exports = {
    entry: __dirname + "/src/app/index.js", // webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + '/build', // Folder to store generated bundle
        filename: './js/bundle.js',  // Name of generated bundle after build
        publicPath: '/' // template URL of the output directory when referenced in a browser
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'src/postcss.config.js'
                            }
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    plugins: [  // Array of plugins to apply to build chunk
        new CleanWebpackPlugin(),
        new ImageMinWebpWebpackPlugin(
            {
                config: [{
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality:  75
                    }
                }],
                overrideExtension: true,
                detailedLogs: false,
                silent: false,
                strict: true
            }
        ),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/template/index.html",
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: "./css/style.css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: __dirname +  '/src/image/', to: './src/image' },
                { from: __dirname +  '/src/image/background', to: './src/image/background' },
                { from: __dirname +  '/src/image/icon', to: './src/image/icon' },
                { from: __dirname +  '/src/fonts/', to: './src/fonts' },
            ],
        }),

    ],
    devServer: {  // configuration for webpack-dev-server
        contentBase: './src/template',  //source of static assets
        port: 8800, // port to run dev-server
    }
};
