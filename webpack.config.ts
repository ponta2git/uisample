import path from "path";
import { Configuration } from "webpack";
import {} from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const isPrd = process.env.NODE_ENV === "production";

const config: Configuration = {
    mode: isPrd ? "production" : "development",
    entry: path.resolve(__dirname, "src/app.tsx"),
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        compress: true,
        host: "0.0.0.0",
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")],
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                    "ts-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }),
    ],
};

export default config;
