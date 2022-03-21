const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => ({
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          require.resolve("style-loader"),
          require.resolve("css-loader"),
        ],
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/\.scss$/, /(node_modules)/],
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/react",
            {
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
              ],
            },
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new Dotenv({
      path: `./environment/.env${env.file ? `.${env.file}` : ""}`,
    }),
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }]),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
