const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../config/database");
const conn = db.init();

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "MEM_ID",
        passwordField: "PASSWD",
        passReqToCallback: false,
      },
      (userName, passWd, done) => {
        try {
          const sql = "SELECT * FROM TB_MEMBER WHERE MEM_ID = ?";
          conn.query(sql, [userName], (error, rows) => {
            if (error) {
              console.log("유저아이디 조회안되면 나는 에러");
              console.error(error);
              return done(error);
            }
            const exUser = rows[0];
            if (exUser) {
              console.log("exUSer", exUser);
              bcrypt.compare(passWd, exUser.PASSWD, (err, result) => {
                if (err) {
                  console.log("비밀번호 해쉬화 실패?");
                  console.error(err);
                  return done(err);
                }

                if (result) {
                  done(null, exUser);
                } else {
                  done(null, false, {
                    message: "비밀번호가 일치하지 않습니다.",
                  });
                }
              });
            } else {
              done(null, false, { message: "가입되지 않은 회원입니다." });
            }
          });
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
