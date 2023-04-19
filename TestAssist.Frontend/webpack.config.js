const path = require('path');
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'test-master.js',
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
                            source: './dist/**/*.js',
                            destination: '../SampleWpfApplication.AcceptanceTests/wwwroot/scripts'
                        },
                        {
                            source: './dist/**/*.map',
                            destination: '../SampleWpfApplication.AcceptanceTests/wwwroot/scripts'
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