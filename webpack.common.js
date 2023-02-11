const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

module.exports = {
  // 현재는 프로젝트에 Entry point가 2개이기 때문에, 2개로 entry를 설정해준다.
  entry: {
    index: "./src/index.js",
    courses: "./src/pages/courses.js",
  },
  /* 
    1. output의 filename에는 [name]을 사용하여, entry의 key값을 사용할 수 있다.
    2. output의 path에는 path.resolve를 사용하여, 절대경로를 사용할 수 있다.
    3. output의 clean에는 true를 사용하여, 이전에 생성된 파일을 삭제할 수 있다.
    4. contenthash는 파일의 내용이 변경되었을 때만, 해시값이 변경된다.
    */
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      /*
        1. png, svg, jpg, jpeg, gif 파일을 처리할 수 있다.
        2. type에는 asset/resource를 사용하여, 파일을 디스크에 저장할 수 있다.
      */
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      mnt: "moment",
      $: "jquery",
    }),
    /*
    1. HtmlWebpackPlugin은 HTML 파일을 생성해주는 플러그인이다.
    2. template에는 템플릿 파일을 설정할 수 있다.
    3. chunks에는 해당 HTML 파일에서 사용할 chunk를 설정할 수 있다.
    4. filename에는 생성될 HTML 파일의 이름을 설정할 수 있다.
  */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html",
      chunks: ["courses"],
      filename: "courses.html",
      base: "pages",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}
