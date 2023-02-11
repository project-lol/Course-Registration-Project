const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "production",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    /*
    1. CopyPlugin은 파일을 복사해주는 플러그인이다.
    2. from에는 복사할 파일의 경로를 설정할 수 있다.
    3. to에는 복사될 파일의 경로를 설정할 수 있다.
    4. context에는 복사할 파일의 기준 경로를 설정할 수 있다.
    */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src",
        },
      ],
    }),
    /*
    1. PurgeCss는 사용하지 않는 CSS를 제거해주는 플러그인이다.
    2. paths에는 제거할 CSS가 사용된 파일의 경로를 설정할 수 있다.
    3. content에는 제거할 CSS가 사용된 파일의 내용을 설정할 수 있다. 
    4. safelist에는 제거하지 않을 CSS 클래스를 설정할 수 있다.
    */
    // new PurgeCss({
    //   paths: glob.sync(`${purgePath.src}/**/*`, { nodir: true }),
    //   safelist: ["dummy-css"],
    // }),
    new MiniCssExtractPlugin(),
  ],
}
