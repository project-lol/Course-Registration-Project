const path = require("path")

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
}
