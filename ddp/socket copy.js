const SocketIO = require("socket.io");
const db = require("./config/database");
let conn = db.init();

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    // 웹소켓 연결 시
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("새로운 클라이언트 접속!", ip, socket.id, req.ip);

    // 연결 종료 시
    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제", ip, socket.id);
      clearInterval(socket.interval);
    });

    // 에러 시
    socket.on("error", (error) => {
      console.error(error);
    });

    // 클라이언트로부터 메시지
    socket.on("reply", (data) => {
      console.log(data);
    });

    // 3초마다 클라이언트로 메시지 전송
    socket.interval = setInterval(() => {
      let sql = `    SELECT *
                     FROM TB_AUCTION
                     WHERE CUST_ID='김유열222';`;
      conn.query(sql, [], (err, rows) => {
        if (!err) {
          console.log(rows);
          socket.emit("news", rows);
        } else {
          console.log("DB명령이 제대로 실행되지 않았습니🥲🥲🥲🥲🥲");
          console.log(err);
        }
      });
    }, 3000);
  });
};
