// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");
const webpack = require('webpack')

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BASE_URL': JSON.stringify(process.env.BASE_URL),
        "STRIPE_API_KEY": JSON.stringify(process.env.STRIPE_API_KEY)
      }
    })
  ],
});
