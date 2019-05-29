const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "public";

module.exports = {
  entry: ["./src/client/index.js"],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.jsx?$/, 
        loader: 'babel-loader',
          exclude: /node_modules/,
        query: {
            presets: ['@babel/preset-env', '@babel/preset-react'] 
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  devServer: {
    port: 5000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};
