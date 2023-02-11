const path = require("path")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = {
  mode: "development",
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
  module: {
    /*
   1. test에는 정규표현식을 사용하여, 어떤 파일을 처리할지를 설정할 수 있다.
   2. use에는 어떤 loader를 사용할지를 설정할 수 있다.
   3. loader는 오른쪽에서 왼쪽으로 실행된다.
   4. loader는 여러개를 사용할 수 있다.
  */
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
        test: /\.(png|jpeg|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new BundleAnalyzerPlugin({})],
}
