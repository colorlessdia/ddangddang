const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const db = require("../config/database");
const conn = db.init();
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/kakao/callback", // 적절한 callbackURL로 수정 필요
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(
          "6666666666666666",
          profile._json.properties.thumbnail_image
        );
        console.log("kakao profile", profile);
        query(
          "SELECT * FROM TB_MEMBER WHERE SNS_ID  = ? AND provider = 'kakao';",
          [profile.id]
        )
          .then(([exUser]) => {
            if (exUser) {
              // console.log("이미 회원이있다면222", accessToken);
              const tokenUser = {
                exUser,
                accessToken: accessToken || "",
              };
              query(
                "UPDATE TB_MEMBER SET MEM_IMG_PATH = ? ,MEM_NICK=? WHERE SNS_ID=?",
                [
                  profile._json.properties.thumbnail_image,
                  profile.displayName,
                  profile.id,
                ]
              );
              // console.log("이미 회원이있다면222", tokenUser);
              return done(null, tokenUser);
            } else {
              // console.log("회원가입이라면", profile);
              return query(
                "INSERT INTO TB_MEMBER (MEM_ID, MEM_TYPE, MEM_NAME, MEM_NICK, MEM_IMG_PATH, SNS_ID, PROVIDER) VALUES (?, '개인', ?, ?, ?, ?, 'kakao');",
                [
                  profile._json?.kakao_account?.email,
                  profile.username,
                  profile.displayName,
                  profile._json.properties.thumbnail_image,
                  profile.id,
                ]
              );
            }
          })
          .then((newUser) => {
            if (newUser) {
              console.log("새로운 유저가 추가되었습니다.", newUser);
              return done(null, newUser);
            }
          })
          .catch((error) => {
            console.error(error);
            done(error);
          });
      }
    )
  );
};
