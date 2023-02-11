# Course Registration Project

바닥부터 웹팩을 설정해나가면서 배워보는 프로젝트입니다.

<br>

## Learning Point : 프로젝트를 통해 학습한 것들

- css loader의 필요성과 사용법을 배웠습니다.
- dist 폴더의 역할을 배웠습니다.
- webpack-dev-server를 사용하여 실시간으로 번들링된 결과물을 볼 수 있게 해주는 도구를 배웠습니다.
- assets을 사용하는 방법을 배웠습니다.
- vendor.js 는 무엇을 의미하는지에 대해서 배웠습니다.
- 코드 스플리팅을 통해 번들링된 파일의 크기를 줄이는 방법을 배웠습니다.

<br>

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

<br>

### dist 폴더의 역할

- dist는 distribution의 줄임말이다.
- dist 폴더는 webpack을 통해 번들링된 파일들이 저장되는 곳이다.
- 이 폴더에 있는 내용물들이 실제 배포되는 파일들이다.
- 이 dist 폴더에는 일반적으로 어플리케이션 코드의 번들링되고 최적화된 코드들이 들어있다.
- 개발모드에서 사용하는 코드들은 제거된 상태로 번들링된다.

<br>

### webpack-dev-server

- webpack-dev-server는 webpack을 사용하여 개발을 할 때, 실시간으로 번들링된 결과물을 볼 수 있게 해주는 도구이다.
- webpack dev server는 HMR(Hot Module Replacement)을 지원한다. HMR은 코드를 수정하면, 수정된 부분만을 업데이트 해주는 기능이다.
- 이것을 사용하면 개발을 할 때, 매번 브라우저를 새로고침하지 않아도 되어서 개발을 편하게 할 수 있다.
- CRA도 내부적으로는 이 webpack-dev-server를 사용하고 있다고 한다.
- 이것을 사용하기 위해서는 webpack.config.js에 devServer를 추가해준다.

```js
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
```

- 그리고 dist 폴더에 index.html을 만들어준다. 이 프로젝트의 경우 index.html은 src 폴더에 있기 때문에, html-webpack-plugin을 사용하여 dist 폴더에 index.html을 만들어준다.

```js
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
```

<br>

### assets을 사용하는 방법

- assets 폴더에는 이미지, 폰트 등의 파일들이 들어있다.
- 이것들을 사용하기 위해서는 file-loader를 사용해야 한다.
- file-loader는 파일을 읽어서 dist 폴더에 저장해주는 역할을 한다.
- 이것을 사용하기 위해서는 webpack.config.js에 module에 rules를 추가해준다.

```js
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
```

- 그리고 기존에 src에 있는 assets들을 dist로 복사해넣기 위해서는 copy-webpack-plugin을 사용해야 한다.
- 이것을 사용하기 위해서는 webpack.config.js에 plugins를 추가해준다.

```js
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
```

- 이렇게 하면 dist 폴더에 assets 폴더가 생성되고, 그 안에 파일들이 저장된다.
- index.html에서 assets 폴더에 있는 파일들을 사용할 수 있다.

```html
<img src="./assets/logo.png" alt="logo" />
```

<br>

### vendor.js 는 무엇을 의미하는 것일까

- vendor.js는 라이브러리들을 모아놓은 파일이다.
- vendor는 주로 번들된 Js 파일들을 의미하는데, 외부 라이브러리들을 모아놓은 파일을 의미한다. 이 파일은 성능을 향상시키기 위해서 주로 메인 어플리케이션 코드와 분리된다. 이렇게 분리함으로써, vendor code는 브라우저에 캐싱할 수도 있고, 브라우저에 캐싱되어 있으면, 어플리케이션 코드가 변경되어도 vendor code는 변경되지 않기 때문에, 어플리케이션 코드만 다시 다운로드 받으면 된다.
- 이것을 사용하기 위해서는 webpack.config.js에 entry에 vendor를 추가해준다.

```js
  entry: {
    app: "./src/index.js",
    vendor: ["react", "react-dom"],
  },
```

- 그리고 output에 filename에 [name]을 추가해준다.

```js
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
```

<br>

### 코드 스플리팅

- 우리의 프로젝트에서 보면 index.js에서 다수의 라이브러리를 가지고 있었고, course.js에서도 다수의 라이브러리를 가지고 있었다. 고로 이것들을 모두 하나의 번들로 만들면, 번들의 크기가 커지게 된다. 이것을 해결하기 위해서는 코드 스플리팅을 사용해야 한다.
- 코드 스플리팅을 사용하면 공통된 라이브러리들을 하나의 번들로 만들고, 각각의 페이지에서 필요한 라이브러리들을 각각의 번들로 만들 수 있다. 이렇게 하면, 공통된 라이브러리들은 하나의 번들로 만들어지기 때문에, 번들의 크기가 작아지고, 각각의 페이지에서 필요한 라이브러리들은 각각의 번들로 만들어지기 때문에, 번들의 크기가 작아진다.
- 공통된 라이브러리는 처음 로딩때 가져오고, 브라우저 캐싱에 저장된다. 그래서 브라우저가 봤을 때 해당 파일이 이미 브라우저에 캐싱되어있다면 다시 불러오지 않을 수 있다. 나머지 각각의 페이지에서 필요한 라이브러리는 해당 페이지에서 필요할 때 가져오기 때문에, 사용자가 필요한 페이지만 빠르게 로딩할 수 있다.
- 위와 같은 방법으로 index.js와 course.js에서 중복된 라이브러리를 불러오는 문제를 해결할 수 있다.
- 그리고 필요한 순간에 Dynamic import을 사용하여 라이브러리를 불러올 수 있다.

|        | 스크린샷                                                                                                                        | 설명                                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| before | <img src="https://user-images.githubusercontent.com/71473074/218247731-44ac0382-276a-4b15-88a3-d4bf15e616cf.png" width="80%" /> | bundle-analyzer로 확인하면 이렇게 공통된 라이브러리가 존재함에도 불구하고, 두 가지 번들로 불러와지는 것을 확인할 수 있다. |
| after  | <img src="https://user-images.githubusercontent.com/71473074/218247742-f90dc9ad-b750-44ab-a413-306e0425fad3.png" width="80%" /> | 코드 스플리팅을 적용하고 난 후, 공통된 라이브러리의 경우 하나의 번들로 합쳐진 것을 확인할 수 있다.                        |

- 이것을 사용하기 위해서는 webpack.config.js에 optimization을 추가해준다.

```js
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
```

### Dynamic import

- Dynamic import는 필요한 순간에 라이브러리를 불러올 수 있다.
- 이것을 사용하기 위해서 import().then()을 사용한다.

```js
$("#pricing-plan").on("click", () => {
  //dynamic import를 사용하면 이것은 Promise를 반환한다. 때문에 then을 사용할 수 있다.
  import(/* webpackChunkName : "modal */ "./components/modal").then(module => {
    const showModal = module.default
    showModal()
    $("#myModal").css("display", "block")
  })
})
```

- 이렇게 하면, pricing-plan을 클릭할 때, modal.js를 불러오게 된다.

<br>

### content hash

- content hash는 파일의 내용이 변경되었을 때만 파일명이 변경되는 것을 의미한다. 파일 내용이 변경되면, contenthash도 변경될 것이고, 그 결과로 파일명도 변경될 것이다. 이렇게하면 브라우저에서 오래된 파일을 캐싱하고 있는 문제를 해결할 수 있다.
- 이것을 사용하기 위해서는 webpack.config.js에 output에 filename에 [contenthash]을 추가해준다.

```js
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
```
