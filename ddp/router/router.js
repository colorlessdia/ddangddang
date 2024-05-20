const cache = require('memory-cache');
const express = require("express");
const db = require("../config/database");
const axios = require("axios");
const path = require("path");
const multer = require("multer");
// 비밀번호 암호화 모듈
const bcrypt = require("bcrypt");
let conn = db.init();
const passport = require("passport"); // passport 모듈 로드
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../passport");


// ============================== multer 설정 ==============================
const cacheDuration = 10 * 60 * 1000;
// ============================== multer 설정 ==============================
const upload = multer({
  storage: multer.diskStorage({
    // 주로 multer.diskStorage 에저장을 많이함
    // destination 어디에저장할지,(여기서는 'uploads/' 폴더에 저장하겠다)
    // done: 에러처리용, 에러처리 미들웨어로 보내줌 두번째 파라미터는 실행할 내용
    destination(req, file, done) {
      done(null, "ddp-react/public/images/SALE_IMAGE/");
    },
    filename(req, file, done) {
      // 무슨이름으로 올릴지
      // multer 1.4.5 버전 한글인코딩 문제 해결
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      // 확장자 추출하는코드
      const ext = path.extname(file.originalname);
      // 어떤이름으로 저장할지1
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // 파일 사이즈 or 파일갯수 설정하기
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB파일만 업로드가능,
});

// router.get('/getData', function (req, res) {
//     // 값 보내기
//     res.json({
//         name: 'hi'
//     })
// })

// ============================== 비드 GET ==============================
// router.get("/bid", (req, res) => {
//   let sql = `SELECT MAX(AUC_FEE) AS FEE FROM TB_AUCTION WHERE PRD_NO=70`;
//   conn.query(sql, [], (err, rows) => {
//     if (!err) {
//       console.log("조회하기 성공");
//       console.log(rows);
//       const maxBid = rows[0].FEE;
//       console.log(maxBid);
//       res.render(path.join(__dirname, "..", "views", "sale.html"), {
//         fee: maxBid,
//       });
//     } else {
//       console.log("삽입실패 ㅜㅜ");
//     }
//   });
//   // res.render(path.join(__dirname, "..", "views", "bids.html"));
// });

// ============================== 비드 POST ==============================
router.post("/bid", (req, res) => {
  const userCustId = req.body.CUST_ID;
  const userBidPrice = req.body.MAX_AUC_FEE + 5000;
  const userPrdNo = req.body.PRD_NO;
  console.log(userBidPrice);
  //   console.log("userCustId:", userCustId);
  //   console.log("userBidPrice:", userBidPrice);
  //   console.log("userPrdNo:", userPrdNo);

  let sql =
    "INSERT INTO TB_AUCTION (PRD_NO, CUST_ID, AUC_FEE) VALUES (?, ?, ?);";
  //   let sql2 = `SELECT A.*
  //   , B.IMG_PATH_1
  //   , B.IMG_PATH_2
  //   , B.IMG_PATH_3
  //   , B.IMG_PATH_4
  //   , MAX(C.AUC_FEE) AS AUC_FEE
  // FROM TB_PRD A
  //     LEFT JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  //     LEFT JOIN TB_AUCTION C ON A.PRD_NO = C.PRD_NO
  // GROUP BY A.PRD_NO, B.IMG_PATH;`;

  conn.query(sql, [userPrdNo, userCustId, userBidPrice], (err, rows) => {
    if (!err) {
      console.log("삽입성공😍😍");
      res.end()
      // conn.query(sql2, [], (err, rows) => {
      //   if (!err) {
      //     console.log("조회성공😍😍");
      //     console.log(rows);
      //     res.render(path.join(__dirname, "..", "views", "sale.html"), {
      //       row: rows,
      //     });
      //   } else {
      //     console.log("삽입실패 ㅜㅜ");
      //     console.log(err);
      //   }
      // });
    } else {
      console.log("삽입실패 ㅜㅜ");
      console.log(err);
    }
  });
});

// ============================== 매물이미지 GET ==============================
router.get("/sale", (req, res) => {
  // console.log("리엑트로3333", req.session.passport.user.id)

  // 캐시에 없을 경우 실제 데이터 처리 (예: 데이터베이스 쿼리)

  // 데이터를 캐시에 저장
  console.log(__dirname);
  let sql = `SELECT A.*,
                    B.IMG_PATH_1,
                    B.IMG_PATH_2,
                    B.IMG_PATH_3,
                    B.IMG_PATH_4,
                    MAX(C.AUC_FEE) AS MAX_AUC_FEE
                FROM
                  TB_PRD A
                LEFT JOIN
                  TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
                LEFT JOIN
                  TB_AUCTION C ON A.PRD_NO = C.PRD_NO
                GROUP BY
                  A.PRD_NO, B.IMG_PATH_1, B.IMG_PATH_2, B.IMG_PATH_3, B.IMG_PATH_4
                ORDER BY A.PRD_VIEWS DESC;`;
  conn.query(sql, [], (err, rows) => {
    if (!err) {
      console.log("이미지불러오기 완료");
      // console.log(rows);
      res.json({ saleInfo: rows });

    } else {
      console.log("DB명령이 제대로 실행되지 않았습니다!!!!!!!!");
    }
  });
  // next();

});

// router.get("/sale", (req, res) => {
//   // console.log("리엑트로3333", req.session.passport.user.id)

//   const saleInfo = cache.get('saleInfo');

//   if (saleInfo) {
//     console.log('캐쉬가 이미있음!');
//     return res.json({ saleInfo: saleInfo });
//   } else {
//     // 캐시에 없을 경우 실제 데이터 처리 (예: 데이터베이스 쿼리)

//     // 데이터를 캐시에 저장
//     console.log(__dirname);
//     let sql = `SELECT A.*,
//                     B.IMG_PATH_1,
//                     B.IMG_PATH_2,
//                     B.IMG_PATH_3,
//                     B.IMG_PATH_4,
//                     MAX(C.AUC_FEE) AS MAX_AUC_FEE
//                 FROM
//                   TB_PRD A
//                 LEFT JOIN
//                   TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
//                 LEFT JOIN
//                   TB_AUCTION C ON A.PRD_NO = C.PRD_NO
//                 GROUP BY
//                   A.PRD_NO, B.IMG_PATH_1, B.IMG_PATH_2, B.IMG_PATH_3, B.IMG_PATH_4
//                 ORDER BY A.PRD_VIEWS DESC;`;
//     conn.query(sql, [], (err, rows) => {
//       if (!err) {
//         console.log("이미지불러오기 완료");
//         // console.log(rows);
//         cache.put('saleInfo', rows);
//         console.log('캐쉬저장 성공ㅎㅎ ');
//         res.json({ saleInfo: rows });

//       } else {
//         console.log("DB명령이 제대로 실행되지 않았습니다!!!!!!!!");
//       }
//     });
//     // next();
//   }
// });

// ============================== 매물이미지 POST ==============================
router.post("/sale", (req, res) => {
  let sql = `SELECT * FROM TB_PRD ('${i + 1}','${i + 1}','${imgPath}');`;

  conn.query(sql, [], (err, rows) => {
    if (!err) {
      console.log("이미지삽입 완료");
      // res.render(path.join(__dirname, "..", "views", "index.html"));
    } else {
      console.log("DB명령이 제대로 실행되지 않았습니다");
    }
  });
});
// ============================== 유저 업로드 GET ==============================
router.get("/userupload", isLoggedIn, (req, res) => {
  console.log("유저명", req.session.passport.user.id);
  conn.connect();

  let sql = `SELECT A. *
                  , B.IMG_PATH_1
                  , B.IMG_PATH_2
                  , B.IMG_PATH_3
                  , B.IMG_PATH_4
               FROM TB_PRD A JOIN TB_PRD_IMG B
                 ON (A.PRD_NO = B.PRD_NO)
                AND A.CUST_ID= ?;`;

  conn.query(sql, [req.session.passport.user.id], (err, rows) => {
    if (!err) {
      console.log("이미지불러오기 완료");
      console.log(rows);
      res.json({ row: rows });
    } else {
      console.log("DB명령이 제대로 실행되지 않았습니🥲🥲🥲🥲🥲");
      console.log(err);
    }
  });
});

// ============================== 유저 업로드 POST ==============================
// router.post("/userupload", (req, res) => { });

// ============================== 업로드 GET ==============================
// router.get("/upload", (req, res) => {
//   console.log(__dirname);
//   console.log("유저명", req.user.user?.MEM_ID);
//   res.render(path.join(__dirname, "..", "views", "upload.html"));
// });


// ============================== 매물등록 POST ==============================
router.post("/upload", upload.array("image"), (req, res) => {
  const {
    image,
    property_type,
    property_name,
    property_location,
    property_address,
    property_description,
    property_floor,
    security_deposit,
    starting_price,
    maximum_price,
  } = req.body;
  console.log(req.body);
  console.log(req?.files);
  let maxPrdNo = 0;
  let sql1 = ` SELECT MAX(PRD_NO) AS MAX 
                 FROM TB_PRD;`;
  const sql2 = `
  INSERT INTO TB_PRD (
      PRD_NO,
      CUST_ID,
      PRD_TYPE,
      PRD_NAME,
      PRD_LOCAL,
      PRD_LOCA,
      PRD_INTRO,
      PRD_FLOOR,
      RENT_FEE,
      MIN_FEE,
      MAX_FEE
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;
  let sql3 = "INSERT INTO TB_AUCTION (PRD_NO, CUST_ID, AUC_FEE) VALUES (?, ?, ?);";
  // 최고값+1 조회 쿼리
  conn.query(sql1, [], (err, rows) => {
    if (!err) {
      console.log("prd_no최고값+1 조회성공");
      maxPrdNo = rows[0].MAX + 1;
      console.log(typeof maxPrdNo);
      console.log(maxPrdNo);
      // 매물 등록 쿼리
      conn.query(
        sql2,
        [maxPrdNo, req.session.passport.user.id, property_type, property_name, property_location, property_address, property_description, property_floor, security_deposit, starting_price, maximum_price,],
        (err, rows) => {
          if (!err) {
            console.log("매물 등록완료");
            console.log(rows);
            const imgPath = {};
            let sql = "";
            for (let i = 0; i < req.files.length; i++) {
              // console.log(path.join(__dirname, "..", req.files[i].path))
              imgPath[`img${i + 1}`] = path.join(`/images/SALE_IMAGE/`, req.files[i].filename);
              // imgPath[`img${i + 1}`] = path.join("\\", req.files[i].filename).replaceAll("\\", "\\\\");
            }
            // for (let i = req.files.length; i < 4; i++) {
            //   imgPath[`img${i + 1}`] = "NULL";
            // }
            if (req.files.length == 1) {
              sql = `INSERT INTO TB_PRD_IMG (PRD_NO, IMG_PATH_1)
                  VALUES (?, ?);`;
            } else if (req.files.length == 2) {
              sql = `INSERT INTO TB_PRD_IMG (PRD_NO, IMG_PATH_1, IMG_PATH_2)
                  VALUES (?, ?, ?);`;
            } else if (req.files.length == 3) {
              sql = `INSERT INTO TB_PRD_IMG (PRD_NO, IMG_PATH_1, IMG_PATH_2, IMG_PATH_3)
                  VALUES (?, ?, ?, ?);`;
            } else if (req.files.length == 4) {
              sql = `INSERT INTO TB_PRD_IMG (PRD_NO, IMG_PATH_1, IMG_PATH_2, IMG_PATH_3, IMG_PATH_4)
                  VALUES (?, ?, ?, ?, ?);`;
            }
            conn.query(sql, [maxPrdNo, `${imgPath?.img1}`, `${imgPath?.img2}`, `${imgPath?.img3}`, `${imgPath?.img4}`,],
              (err, rows) => {
                if (!err) {
                  console.log("이미지삽입 완료😍😍😍😍😍😍");
                  console.log(`들어간 이미지 ${imgPath?.img1} `);
                  //======================== 매물등록시 옥션테이블에도 최저가 셋팅 
                  conn.query(sql3, [maxPrdNo, req.session.passport.user.id, starting_price], function (err, rows) {
                    if (!err) {
                      console.log("매물등록시 옥션테이블에도 최저가 세팅 성공");
                      res.redirect("http://localhost:3333/");
                    } else {
                      console.log("오류!");
                    }
                  });
                } else {
                  console.log(err);
                  console.log("DB명령이 제대로 실행되지 않았습니다");
                }
              }
            );
          } else {
            console.log(err);
            console.log("매물등록 실패 🥲🥲🥲🥲");
          }
        }
      );
    } else {
      console.log("prd_no최고값+1 조회실패🥲🥲🥲🥲🥲");
    }
    // res.render(path.join(__dirname, "..", "views", "main.html"));
  });
});
// ============================== 메인 GET ==============================
// router.get("/", (req, res) => {
//   console.log(req.user?.MEM_ID);
//   // console.log()
//   // console.log()
//   res.render(path.join(__dirname, "..", "views", "main.html"));
// });

// ============================== 로그인 GET==============================
// router.get("/login", isNotLoggedIn, (req, res) => {
//   console.log("req.user.userName");
//   console.log(req?.user?.accessToken);
//   console.log(req.user);
//   res.render(path.join(__dirname, "..", "views", "login.html"));
// });
// ============================== 로그인POST==============================

router.post("/login", (req, res, next) => {
  // passport.authenticate() 메서드를 호출하여 로컬(Local) 인증 전략을 실행합니다.
  // 로그인 처리를 위한 미들웨어입니다.
  passport.authenticate(
    "local",
    {
      successRedirect: "http://localhost:3333/", // 로그인 성공 시 리다이렉트할 페이지
      failureRedirect: "/login", // 로그인 실패 시 리다이렉트할 페이지
    },
    (authError, user, info) => {
      // console.log("7777777777777", req.user)
      if (authError) {
        // 인증 에러가 발생하면 콘솔에 출력하고, 에러 핸들러로 전달합니다.
        console.log("인증에러 🥲");
        console.error(authError);
        return next(authError);
      }

      if (!user) {
        console.log(user);
        // 사용자 정보가 없을 경우, 즉 인증 실패 시 info.message를 통해 에러 메시지를 가져와 메인 페이지로 리다이렉트합니다.
        console.log("인증실패 ㅜ😥");
        return res.redirect(`/login?error=${info.message}`);
      }

      // 사용자 정보가 존재하면, req.login()을 호출하여 사용자를 로그인시킵니다.
      return req.login(user, (loginError) => {
        if (loginError) {
          // 로그인 중 에러가 발생하면 콘솔에 출력하고, 에러 핸들러로 전달합니다.
          console.log("로그인 중 에러 ㅜ😒");
          console.log(loginError);
          return next(loginError);
        }

        // 로그인이 성공적으로 이루어지면 메인 페이지로 리다이렉트합니다.
        console.log("로그인성공😍");
        console.log(req.user);
        console.log(req.session);
        console.log(req.session.passport.user);

        res.json({ user: req.user });
        next();
      });
    }
  )(req, res, next); // passport.authenticate()는 미들웨어를 리턴하므로, 미들웨어 내의 미들웨어를 사용하기 위해 (req, res, next)를 붙여줍니다.
});

// router.post("/login",(req,res)=>{
//   console.log("123")
//   res.redirect("http://localhost:3000/filter")
// })

// ============================== 회원가입 GET==============================
// router.get("/join", (req, res) => {
//   // 이미지 경로 테스트
//   res.render(path.join(__dirname, "..", "views", "join.html"));
//   // console.log(path.join(__dirname, "..", "views", "index.html"))
// });

// ============================== 회원가입 POST==============================

router.post("/join", (req, res, next) => {
  const {
    MEM_ID,
    MEM_TYPE,
    PASSWD,
    MEM_NAME,
    MEM_NICK,
    MEM_TEL,
    MEM_ADDR,
    BIZ_NUM,
  } = req.body;
  console.log("111111111111111111111111111111", req.body.MEM_ID);
  console.log("111111111111111111111111111111", req.body.PASSWD);
  // console.log("111111111111111111111111111111", req)

  console.log("22222222222222", req.body.userJoinInfo);
  conn.query(
    "SELECT * FROM TB_MEMBER WHERE MEM_ID = ?",
    [MEM_ID],
    (err, rows) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      const exUser = rows[0];
      // console.log("????", rows);
      // console.log("????", exUser);

      if (exUser) {
        // 이미 존재하는 이메일일 경우, 회원가입 페이지로 리다이렉트하면서 오류 메시지 전달
        console.log("이미존재하는 회원");
        return res.redirect("/join?error=exist");
      }

      bcrypt.hash(PASSWD, 12, (err, hash) => {
        if (err) {
          console.error(err);
          return next(err);
        }

        conn.query(
          "INSERT INTO TB_MEMBER (MEM_ID, MEM_TYPE, PASSWD, MEM_NAME, MEM_NICK, MEM_TEL, MEM_ADDR, PROVIDER) VALUES (?, ?, ?, ?, ?, ?,?, 'Local');",
          [MEM_ID, MEM_TYPE, hash, MEM_NAME, MEM_NICK, MEM_TEL, MEM_ADDR],
          (err) => {
            if (err) {
              console.error(err);
              return next(err);
            }
            console.log("회원가입성공 ㅎㅎ");
            return res.redirect("/http://localhost:3333/"); // 회원가입 성공 시 메인 페이지로 리다이렉트
          }
        );
      });
    }
  );
});

// ============================== 로그아웃 GET==============================
router.get("/logout", (req, res) => {
  console.log("로그아웃 들어왔을땐 있어야함", req.session.passport.user);
  console.log(req.user);
  req.logout(() => {
    console.log("지금은 없어야함", req?.session?.passport?.user ?? "사라짐 ");
    // res.render(path.join(__dirname, "..", "views", "main.html"));
    return res.redirect("/http://localhost:3333/");
  });
});

// ============================== 카카오로그인 GET==============================
router.get("/kakao", passport.authenticate("kakao"));
// ============================== 카카오로그인 GET==============================
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?error=카카오로그인 실패",
  }),
  (req, res) => {
    console.log("카카오로그인성공!😍😍");
    // console.log("222222222222222222222222", req.user.exUser);
    // res.render(path.join(__dirname, "..", "views", "main.html"), {
    //   user: req.user.exUser,
    // });
    return res.redirect("/");
  }
);
// ============================== 카카오로그아웃 GET==============================
router.get("/kakao/logout", async (req, res) => {
  try {
    const ACCESS_TOKEN = req.user.accessToken;
    let logout = await axios({
      method: "post",
      url: "https://kapi.kakao.com/v1/user/unlink",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  } catch (error) {
    console.error(error);
    console.log("error", "2222222222222222222222222222222222222");
    // res.json(error);
  }
  // 세션 정리
  req.logout(() => {
    console.log("카카오 로그아웃 성공😊😊😊");
    req.session.destroy();
  });
  // res.render(path.join(__dirname, "..", "views", "main.html"));
  res.redirect("/http://localhost:3333/");
});

// =====================내정보 가져오기=========jh=====================

router.get("/myinfo", function (req, res) {
  conn.connect();
  let sql = "SELECT * FROM TB_MEMBER WHERE= ?";
  conn.query(sql, [req.session.passport?.user.id], function (err, rows) {
    if (!err) {
      console.log("내정보 불러오기 성공");
      if (rows.length == 0) {
        console.log("정보 없음");
      } else {
        console.log("정보 없음");
        res.json({ rows: rows });
      }
    }
    // res.end();
  });
});

//=========================================== 필터 기능 ===================================================

router.get("/Filter", function (req, res) {
  let Ft = req?.query;
  let FS1 = req?.query?.test?.S1;
  let FS2 = req?.query?.test?.S2;
  let FS3 = req?.query?.test?.S3;
  let FL1 = req?.query?.test?.L1;
  let FL2 = req?.query?.test?.L2;
  let FV1 = req?.query?.test?.V1;
  console.log("S1:", req?.query?.test?.S1);
  console.log("S2:", req?.query?.test?.S2);
  console.log("S3:", req?.query?.test?.S3);
  console.log("L1:", req?.query?.test?.L1);
  console.log("L2:", req?.query?.test?.L2);
  console.log("V1:", req?.query?.test?.V1);
  console.log("33333333", req?.query);

  console.log(req.query.test);


  conn.connect();

  let sql =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM TB_PRD A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  WHERE A.PRD_TYPE IN (?, ?, ?)
  AND A.PRD_LOCAL IN (?, ?)
  ORDER BY
      CASE
          WHEN ? = 1 THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`;

  let sql2 =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM (
      SELECT *
      FROM TB_PRD
      WHERE PRD_LOCAL IN (?, ?)
  ) A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  ORDER BY
      CASE
          WHEN ? = 1 THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`;

  let sql3 =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM (
      SELECT *
      FROM TB_PRD
      WHERE PRD_TYPE IN (?, ?, ?)
  ) A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  ORDER BY
      CASE
          WHEN ? = 1 THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`;

  let sql4 =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM (
      SELECT *
      FROM TB_PRD
      WHERE PRD_LOCAL IN (?) OR PRD_LOCAL NOT IN ('광주')
  ) A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  ORDER BY
      CASE
          WHEN ? = 1 THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`;

  let sql5 =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM (
      SELECT *
      FROM TB_PRD
      WHERE PRD_TYPE IN (?, ?, ?)
      OR (PRD_LOCAL IN (?) AND PRD_LOCAL NOT IN ('광주'))
  ) A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  ORDER BY
      CASE
          WHEN ? = 1 THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`;

  let sql6 =
    `SELECT A.*, B.*, C.MAX_AUC_FEE
  FROM (
      SELECT *
      FROM TB_PRD
  ) A
  JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
  JOIN (
      SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
      FROM TB_AUCTION
      GROUP BY PRD_NO
  ) C ON A.PRD_NO = C.PRD_NO
  ORDER BY
      CASE
          WHEN ? = '1' THEN -A.PRD_VIEWS
          ELSE A.PRD_VIEWS
      END;`


  if (
    FS1 === undefined &&
    FS2 === undefined &&
    FS3 === undefined &&
    FL1 === undefined &&
    FL2 === undefined
  ) {
    conn.query(sql6, [FV1], function (err, rows) {
      if (!err) {
        console.log(
          "조회수조회수조회수조회수조회수조회수조회수조회수조회수조회수조회수조회수조회수조회수"
        );
        res.json({ rows: rows });
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //   row: rows})
      } else {
        console.log("오류!");
      }
    });
  } else if (
    FS1 === undefined &&
    FS2 === undefined &&
    FS3 === undefined &&
    FL2 === "전남"
  ) {
    conn.query(sql4, [FL1, FV1], function (err, rows) {
      if (!err) {
        console.log("위치!!!!!!!!!!!!!!!!!!!!!!!!");
        res.json({ rows: rows });
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //         row: rows})
      } else {
        console.log("오류2!");
      }
    });
  } else if (FS1 === undefined && FS2 === undefined && FS3 === undefined) {
    conn.query(sql2, [FL1, FL2, FV1], function (err, rows) {
      if (!err) {
        console.log("위치!!!!!!!!!!!!!!!!!!!!!!!!");
        res.json({ rows: rows });
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //   row: rows})
      } else {
        console.log("오류2!");
      }
    });
  } else if (FL1 === undefined && FL2 === undefined) {
    conn.query(sql3, [FS1, FS2, FS3, FV1], function (err, rows) {
      if (!err) {
        console.log("유형!!!!!!!!!!!!!!!!!!!!!!!!");
        res.json({ rows: rows });
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //   row: rows})
      } else {
        console.log("오류3!");
      }
    });
  } else if (FL2 === "전남") {
    conn.query(sql5, [FS1, FS2, FS3, FL1, FV1], function (err, rows) {
      if (!err) {
        console.log("2더블!!!!!!!!!!!!!!!!!!!!!!!!");
        res.json({ rows: rows });
        // console.log(rows)
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //   row: rows})
      } else {
        console.log("오류!");
      }
    });
  } else {
    conn.query(sql, [FS1, FS2, FS3, FL1, FL2, FV1], function (err, rows) {
      if (!err) {
        console.log("더블!!!!!!!!!!!!!!!!!!!!!!!!");
        res.json({ rows: rows });
        // res.render(path.join(__dirname, "..", "views", "sale.html"), {
        //   row: rows})
      } else {
        console.log("오류!");
      }
    });
  }
  // next()
});

//==========================찜기능 GET ================================

router.get("/Wish", function (req, res) {
  console.log(
    "찜성공 ㅎㅎ"
  );

  let prdN = req.query.PRD_NO
  let checkTF = req.query.isChecked
  console.log(prdN);
  console.log(checkTF);
  // let ckL = req.query.I;
  // let ck1 = req.query.I[0];
  // console.log(ckL);

  conn.connect();

  addSql = `insert into TB_PRD_LIKE values (?,?,DEFAULT,DEFAULT)`;
  delSql = "delete from TB_PRD_LIKE where CUST_ID = ? and PRD_NO = ?";

  if (checkTF == 'false') {
    conn.query(delSql, [req.session.passport.user.id, prdN], function (err, rows) {
      if (!err) {
        console.log("Delete!");
        res.end()
      } else {
        console.log("오류!");
      }
    });
  } else if (checkTF == 'true') {
    conn.query(addSql, [req.session.passport.user.id, prdN], function (err, rows) {
      if (!err) {
        console.log("Insert!");
        res.end()
      } else {
        console.log("오류!");
      }
    });
  }
});
//======================================== 회원정보 수정 GET =======================================

//회원정보 수정 페이지에 회원정보 뿌려주는 기능
router.get("/Modify", function (req, res) {
  let sql = `SELECT * FROM TB_MEMBER WHERE MEM_ID = ?`;
  conn.query(sql, [req.session.passport.user.id], function (err, rows) {
    if (!err) {
      console.log("여기있다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(rows);
      res.json({ row: rows });
    } else {
      console.log("오류!");
    }
  });
});

//======================================== 회원정보 수정 POST =======================================

router.post("/Modify", function (req, res) {
  let mPW = req.body.PASSWD;
  let mNick = req.body.MEM_NICK;

  let sql = `UPDATE TB_MEMBER
      SET PASSWD = ?, MEM_NICK = ?
      WHERE MEM_ID = ? ;`;

  //비밀번호
  bcrypt.hash(mPW, 12, (err, hash) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    //수정 가능한 회원정보 입력 후 수정 누르면 DB업데이트 해주는 기능
    conn.query(sql, [hash, mNick, req.session.passport.user.id], function (err, rows) {
      if (!err) {
        console.log(rows);
      } else {
        console.log("오류!");
      }
    });
  });
});







//=========================================== 관심목록 GET ======================================

router.get("/Wishlist", function (req, res) {
  let sql = `SELECT A.PRD_NO, A.CUST_ID, A.WISH_YN, B.IMG_PATH_1, MAX(C.AUC_FEE) AS AUC_FEE, D.*
  FROM TB_PRD_LIKE A LEFT JOIN TB_PRD_IMG B ON A.PRD_NO = B.PRD_NO
                LEFT JOIN TB_AUCTION C ON A.PRD_NO = C.PRD_NO
                     LEFT JOIN TB_PRD D ON A.PRD_NO = D.PRD_NO
  WHERE A.CUST_ID = ?
    AND WISH_YN ='Y'
  group by A.PRD_NO, A.CUST_ID, A.WISH_YN,B.IMG_PATH_1;
`;

  conn.query(sql, [req.session.passport.user.id], function (err, rows) {
    if (!err) {
      console.log("찜목록 불러오기!!!!!!!!!!");
      console.log(rows);
      res.json({ row: rows });
    } else {
      console.log("오류!!!");
    }
  });
});

//==================================== 올린매물 GET =============================================

router.get("/Uplist", function (req, res) {
  let sql = `SELECT A.*
  , B.*
  , C.*
  , MaxAuction.Max_AUC_FEE AS Max_AUC_FEE
  FROM TB_PRD A
  JOIN TB_PRD_IMG B ON (A.PRD_NO = B.PRD_NO)
  JOIN (
    SELECT DISTINCT PRD_NO, CUST_ID
    FROM TB_AUCTION
    ) C ON (B.PRD_NO = C.PRD_NO)
    JOIN (
    SELECT PRD_NO, MAX(AUC_FEE) AS Max_AUC_FEE
    FROM TB_AUCTION
    GROUP BY PRD_NO
    ) MaxAuction ON (C.PRD_NO = MaxAuction.PRD_NO)
    WHERE A.CUST_ID = ?;`;

  conn.query(sql, [req.session.passport.user.id], function (err, rows) {
    if (!err) {
      console.log(
        "올린 매물 불러오기~~~~~~~~~~~~~~~11111111111111111111111111111111"
      );
      console.log(rows);
      res.json({ row: rows });
    } else {
      console.log("오류!!!");
    }
  });
});

//========================== 입찰 목록 GET ==========================================

router.get("/Auclist", function (req, res) {
  let sql = `SELECT A.*
  , B.*
  , C.*
  , MaxAuction.Max_AUC_FEE AS Max_AUC_FEE
  FROM TB_PRD A
  JOIN TB_PRD_IMG B ON (A.PRD_NO = B.PRD_NO)
  JOIN (
    SELECT DISTINCT PRD_NO, CUST_ID
    FROM TB_AUCTION
    ) C ON (B.PRD_NO = C.PRD_NO)
    JOIN (
    SELECT PRD_NO, MAX(AUC_FEE) AS Max_AUC_FEE
    FROM TB_AUCTION
    GROUP BY PRD_NO
    ) MaxAuction ON (C.PRD_NO = MaxAuction.PRD_NO)
    WHERE C.CUST_ID = ?;`;

  let sql2 = `SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
    FROM TB_AUCTION
    GROUP BY PRD_NO;`;

  conn.query(sql, [req.session.passport.user.id], function (err, rows) {
    if (!err) {
      console.log("입찰 목록 불러오기!");
      console.log(rows);

      conn.query(sql2, [], function (err, rows2) {
        if (!err) {
          console.log("매물 최고가 불러오기!!");
          console.log(rows2);
          res.json({ row: rows, row2: rows2 });
        } else {
          console.log("오류!");
        }
      });
    } else {
      console.log("오류!!!");
    }
  });
});

//=======================이거는 무조건 맨밑으로 내리기!!=======================
router.get("*", function (req, res) {
  console.log("리엑트로3333", req.session.passport?.user?.id)
  console.log("리엑트로 이동@@@@@@@@@");
  res.sendFile(path.join(__dirname, "..", "ddp-react", "build", "index.html"));
});

module.exports = router;
