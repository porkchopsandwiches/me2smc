const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const package = require("./package.json");

const sass_loaders = [
    "css-loader?sourceMap",
    "resolve-url?sourceMap",
    "sass-loader?sourceMap"
];

module.exports = {
    "entry": "./source/typescript/app.ts",
    "output": {
        "filename": "bundle." + package.version + ".js",
        "path": path.join(__dirname, "./public/cdn/bundle/assets"),
        "publicPath": "/cdn/bundle/assets"
    },

    // Source maps
    "devtool": "source-map",
    "resolve": {
        "extensions": ["", ".webpack.js", ".web.js", ".ts", ".js", ".scss"],
        "modulesDirectories": [
            "web_modules",
            "node_modules",
            "source/vendor/bourbon",
            "source/vendor/neat",
            "source/vendor/normalize"
        ]
    },

    // Minification
    "plugins": [
        // Minify JS
        new webpack.optimize.UglifyJsPlugin(),

        // Extract CSS into a standalone file
        new ExtractTextPlugin("bundle." + package.version + ".css")
    ],

    // Loaders
    "module": {

        "preLoaders": [
            {
                "test": /\.ts$/,
                "loader": "tslint"
            }
        ],

        "loaders": [

            // Images in the CSS
            {
                test: /(\.jpg|\.png|\.gif)$/,
                //loader: "file-loader?context=/source/scss/&name=/[path][name].[ext]"
                loader: "file-loader?context=" + path.join(__dirname, "./source/scss") + "&name=/[path][name].[ext]"
            },

            // SCSS
            {
                "test": /\.scss$/,
                "loader": ExtractTextPlugin.extract("style-loader", sass_loaders.join("!"))
            },

            // TypeScript
            {
                "test": /\.ts$/,
                "loader": "ts-loader"
            }
        ]
    },

    // Typescript Lint config
    "tslint": {
        emitErrors: false,
        failOnHint: true
    },

    // SCSS config
    "sassLoader": {
        "includePaths": [
            path.resolve(__dirname, "./source/scss")
        ]
    }
}
