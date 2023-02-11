# Course Registration Project

바닥부터 웹팩을 설정해나가면서 배워보는 프로젝트입니다.

## Learning Point

### Css Loader는 왜 필요할까

- css-loader는 css파일을 읽어서 js로 변환해주는 역할을 한다. css 파일을 js모듈로 변환해주어야 하는 이유는 웹팩이 모든 것을 모듈로 다루기 때문이다. css파일을 js로 변환해주면 웹팩이 css파일을 읽을 수 있게 된다. 이렇게하면 css파일을 읽어서 html에 style태그로 삽입해주는 역할을 하는 style-loader와 함께 사용할 수 있다.
- style-loader는 css파일을 읽어서 html에 style태그로 삽입해주는 역할을 한다.
- 이것을 설정해주기 위해서 webpack.config.js에 module에 rules를 추가해준다.

```js
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
    ],
  },
```
