const path = require("path")
const webpack = require("webpack")

const { TsConfigPathsPlugin } = require("awesome-typescript-loader")

module.exports = {
    entry: [
        "./client/index.tsx"
    ],
    output: {
        path: __dirname + "/dist/client/static",
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            "common": path.resolve(__dirname, "common/")
        },
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },
    devServer: {
        contentBase: "./dist/client",
        publicPath: "/static/",
        hot: true, 
        proxy: [{
            context: ["/api", "/api/entries", "/api/dogs", "/checkToken", "/api/logout", "/api/login"],
            target: "http://localhost:3000"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // this shit dooes not work for some reason, it adds redundant /.. to aliases
        //     new TsConfigPathsPlugin({
        //         paths: {
        //             "common/*": [
        //                 "common/*"
        //             ]        
        //         }
        //     })

    ],
    devtool: 'source-map',
    mode: "development"
}