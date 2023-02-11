const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    // 현재는 프로젝트에 Entry point가 2개이기 때문에, 2개로 entry를 설정해준다.
    index: "./src/index.js",
    courses: "./src/pages/courses.js",
  },
  /* 
    1.output의 filename에는 [name]을 사용하여, entry의 key값을 사용할 수 있다.
    2. output의 path에는 path.resolve를 사용하여, 절대경로를 사용할 수 있다.
    3. output의 clean에는 true를 사용하여, 이전에 생성된 파일을 삭제할 수 있다.
    */
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  /*
    1. devServer의 static에는 정적파일을 제공할 경로를 설정할 수 있다.
    2. devServer의 port에는 서버를 실행할 포트를 설정할 수 있다.
    3. devServer의 open에는 true를 사용하여, 서버를 실행할 때, 브라우저를 자동으로 실행할 수 있다.
    4. devServer의 hot에는 true를 사용하여, hot reload를 사용할 수 있다.
    5. devServer의 devMiddleware에는 publicPath를 설정할 수 있다. 
    6. devServer의 devMiddleware에는 writeToDisk을 사용하여, 파일을 디스크에 저장할 수 있다.
  */
  devServer: {
    static: "./dist",
  },
  /*
   1. test에는 정규표현식을 사용하여, 어떤 파일을 처리할지를 설정할 수 있다.
   2. use에는 어떤 loader를 사용할지를 설정할 수 있다.
   3. loader는 오른쪽에서 왼쪽으로 실행된다.
   4. loader는 여러개를 사용할 수 있다.
  */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      /*
        1. png, svg, jpg, jpeg, gif 파일을 처리할 수 있다.
        2. type에는 asset/resource를 사용하여, 파일을 디스크에 저장할 수 있다.
      */
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  /*
    1. HtmlWebpackPlugin은 HTML 파일을 생성해주는 플러그인이다.
    2. template에는 템플릿 파일을 설정할 수 있다.
    3. chunks에는 해당 HTML 파일에서 사용할 chunk를 설정할 수 있다.
    4. filename에는 생성될 HTML 파일의 이름을 설정할 수 있다.
  */
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/courses.html",
      chunks: ["courses"],
      filename: "courses.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src",
        },
      ],
    }),
  ],
}
