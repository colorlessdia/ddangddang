const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const db = require("../config/database");
const conn = db.init();

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("사용자 정보 serializeUser", user);

    if (user.exUser) {
      user.MEM_ID = user.exUser.MEM_ID;
    }
    console.log("유저에 exuser담기", user.MEM_ID);
    const accessToken = {
      id: user.MEM_ID,
      accessToken2: user?.accessToken,
    };
    console.log("유저아이디", accessToken.id);
    console.log("카카오로그인시 들어가는 토큰", accessToken.accessToken2);
    done(null, accessToken);
  });

  passport.deserializeUser((id, done) => {
    // console.log("7777777777777777777777777777", id);
    // console.log("22222222222222222", id.id);
    // console.log("444444444444444444444444444444444", id.accessToken2);
    // 'users' 부분을 사용자 데이터가 저장된 MySQL 테이블 이름으로 바꿔주세요.

    const sql = "SELECT * FROM TB_MEMBER WHERE MEM_ID = ?";

    // 사용자 ID를 파라미터로 하여 쿼리를 실행합니다.
    conn.query(sql, [id.id], (err, results) => {
      if (err) {
        return done(err);
      }

      // 사용자를 찾으면 사용자 객체를 done 콜백에 전달합니다.
      if (results.length > 0) {
        const user = results[0];
        const tokenUser = { user, accessToken: id.accessToken2 };
        console.log("토큰+유저정보", tokenUser);

        return done(null, tokenUser);
      }

      // 사용자를 찾지 못하면 done 콜백에 null을 전달합니다.
      return done(null, null);
    });
  });
  local();
  kakao();
};
