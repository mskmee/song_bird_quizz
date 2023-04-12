// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const generateHtmlPlugin = (title) => {
  return new HtmlWebpackPlugin({
    title,
    filename: `${title.toLowerCase()}.html`,
    template: `./src/${title.toLowerCase()}.html`,
    favicon: './src/assets/fav/favicon.ico',
  });
};

const populateHtmlPlugins = (pagesArray) => {
  const res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  });
  return res;
};

const pages = populateHtmlPlugins(["index", "quiz", "gallery"]);


const config = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext][query]",
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/resource",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {

  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin({ filename: "style/[name].[contenthash].css" }));
  } else {
    config.mode = "development";
  }
  return config;
};
