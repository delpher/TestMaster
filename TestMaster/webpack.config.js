const path = require('path');
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    entry: {
        'test-master.explorer': './src/test-master.explorer.js',
        'test-master.standalone': './src/test-master.standalone.js'
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: './src/test-master.standalone.css',
                            destination: './dist/test-master.standalone.css'
                        },
                        {
                            source: './dist/**/*.js',
                            destination: '../SampleWpfApplication.AcceptanceTests/scripts'
                        },
                        {
                            source: './dist/**/*.map',
                            destination: '../SampleWpfApplication.AcceptanceTests/scripts'
                        },
                        {
                            source: './dist/**/*.css',
                            destination: '../SampleWpfApplication.AcceptanceTests/scripts'
                        },
                    ]
                }
            }
        })
    ],
    devServer: {
        static: ['./dist', './samples'],
    },
};