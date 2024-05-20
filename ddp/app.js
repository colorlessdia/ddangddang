const express = require("express");
const webSocket = require("./socket");
// 클라이언트 요청정보얻기
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// .env로 키관리
const dotenv = require("dotenv");
const path = require("path");
// 이미지처리 라이브러리
const multer = require("multer");
// 파일처리
const fs = require("fs");
// axios 처리
let cors = require("cors");
const router = require("./router/router");
const nunjucks = require("nunjucks");
// const bcrypt = require('bcrypt');
// const { sequelize } = require("./models");
dotenv.config();
const passport = require("passport");
const passportConfig = require("./passport/Strategy");
// const passportConfig2 = require("./passport/StrategyLocal");
const app = express();
passportConfig();
// passportConfig2();
// passportConfig 설정: 로그인세션관련

app.set("port", process.env.PORT || 3333);
// axios 처리
app.use(cors());
app.use(morgan("dev"));
// 정적파일 path처리(리엑트 빌드되면 수정)
app.use(express.static("multertest"));
app.use(express.static("views"));
// 이미지 static 등록
app.use(express.static("uploads"));
app.use(express.static("img/SALE_IMAGE"));
app.use("/", express.static(path.join(__dirname, "ddp-react", "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
nunjucks.configure("views", { express: app, watch: true });

app.set("view engine", "html");
app.use(passport.initialize());

app.use(
  session({
    httpOnly: true, // http 통신일때 허용
    secret: process.env.COOKIE_SERECT, // 암호화 키
    resave: false, // 요청이 들어왔을 때 세션의 수정사항이 없더라도 다시저장
  })
);
app.use(passport.session());
app.use(router);

const server = app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번시작");
});
webSocket(server);
