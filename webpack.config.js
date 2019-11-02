const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const utils = require('./webpack.utils.js'); //导入工具类  
const isDist = utils.getDistFlag(); //是否启用压缩配置
const alias = utils.getProjectAlias();

const webpackConfig = {
    // webpack4.x 环境配置项
    mode: isDist ? 'production' : 'development',
    // 入口文件配置项
    entry: path.resolve(__dirname, 'src/index.js'),
    // 输出文件配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isDist ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js',
        chunkFilename: isDist ? 'js/[name].[hash].bundle.js' : 'js/[name].bundle.js',
        publicPath: '/'
    },
    // 打开/关闭提示。
    // performance: {
    //     hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    // },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
            }
        },
    },
    // 加载器 loader 配置项
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
            },
            {
                test: /\.(css|scss)$/,
                use: isDist ? [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [autoprefixer()],
                        },
                    },
                    'sass-loader'
                ] : [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer()],
                            }
                        },
                        'sass-loader'
                    ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '4096',
                        name: 'assets/img/[name].[hash].[ext]',
                        publicPath: '/'
                    }
                },]
            }
        ]
    },
    // 插件配置项
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',//输出文件的名称
            template: path.resolve(__dirname, 'src/index.html'),//模板文件的路径
            title: 'vue-webpack',//配置生成页面的标题
        }),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ],
    // 开发工具
    devtool: 'eval-source-map',
    resolve: {
        extensions:['.js','.vue','.json','.css','.scss'],
        alias: alias,
    }
};
if (isDist) {
    webpackConfig.plugins.push(new MiniCssExtractPlugin({
        filename: 'css/style.[hash].css',
        chunkFilename: 'css/[name].[hash].css',
    }));
    webpackConfig.optimization.minimizer = [
        new UglifyJsPlugin({
            chunkFilter: (chunk) => {
                if (chunk.name === 'vendors') {
                    return false;
                }
                return true;
            }
        }),
        new OptimizeCSSAssetsPlugin({})
    ];
} else {
    webpackConfig.devServer = {
        port: 3333,
        host: '0.0.0.0',
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
    };
}

module.exports = webpackConfig;