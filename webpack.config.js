const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: { myAppName: path.resolve(__dirname, "./src/index.js") },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: production ? "[name].[contenthash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx"],
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Webpack & React",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 3001,
    hot: true,
  },
  mode: production ? "production" : "development",
};
