const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let includeOnSites = [
    '<tustena-url>'
];
includeOnSites = includeOnSites.map((x) => x.toString());

module.exports = {
    mode: "production",
    entry: {
        "tustena": path.join(__dirname, "src", "tustena.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "tustena.js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    optimization: {
        minimize: true
    },
    plugins: [
        new WebpackUserscript({
            headers: {
                name: "[name]",
                version: "[version]",
                author: "[author]",
                description: "[description]",
                homepage: "[homepage]",
                namespace: "[homepage]",
                icon: "http://www.tustena.com/favicon.ico",
                "run-at": "document-idle",
                grant: "none",
                noframes: true,
                include: includeOnSites,
                supportURL: "[homepage]/issues"
            },
            pretty: false,
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            node_modules: path.join(__dirname, "node_modules")
        }
    }
};
