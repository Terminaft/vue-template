const webpack = require("webpack"),
    path = require("path"),
    fileSystem = require("fs"),
    env = require("./utils/env"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin");

// load the secrets
const alias = {
    'vue$': 'vue/dist/vue.esm.js'
};

const secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

if (fileSystem.existsSync(secretsPath)) {
    alias["secrets"] = secretsPath;
}

let options = {
    entry: {
        index: path.join(__dirname, "src", "js", "index.js"),
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                loader: "style-loader!css-loader",
                exclude: /node_modules/
            },
            {
                test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]'
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: alias
    },
    plugins: [
        // clean the build folder
        new CleanWebpackPlugin([
            "build",
            //"releases"
        ]),
        // expose and write the allowed env consts on the compiled bundle
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            {from: 'src/img'},
            {from: 'src/fonts'},
            {from: 'src/css'}
        ]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            filename: "index.html",
            chunks: ["index"]
        }),
        new WriteFilePlugin()
    ]
};

switch (env.NODE_ENV) {
    case 'development':
        options.devtool = "cheap-module-eval-source-map";
        break;
    case 'production':

        break;
}

module.exports = options;