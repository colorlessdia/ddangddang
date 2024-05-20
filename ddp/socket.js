// const SocketIO = require("socket.io");
// const db = require("./config/database");
// let conn = db.init();

// module.exports = (server) => {
//   const io = SocketIO(server, { path: "/socket.io" });

//   io.on("connection", (socket) => {
//     // 웹소켓 연결 시
//     const req = socket.request;
//     const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//     console.log("새로운 클라이언트 접속!", ip, socket.id, req.ip);

//     // 연결 종료 시
//     socket.on("disconnect", () => {
//       console.log("클라이언트 접속 해제", ip, socket.id);
//       clearInterval(socket.interval);
//     });

//     // 에러 시
//     socket.on("error", (error) => {
//       console.error(error);
//     });

//     // 클라이언트로부터 메시지
//     socket.on("reply", (data) => {
//       // let a = 1;
//       if (data) {
//         console.log(data);
//         console.log("들어옴")
//         // 데이터를 먼저 CUST_ID 에 넣고
//         let sql = `SELECT A.*, B.MAX_AUC_FEE
//                    FROM (
//                        SELECT A.PRD_NO, P.PRD_NAME, A.CUST_ID, A.AUC_FEE, MAX(A.AUC_FEE) AS MAX_AUC_FEE
//                        FROM TB_AUCTION A
//                        JOIN TB_PRD P ON A.PRD_NO = P.PRD_NO
//                        WHERE A.CUST_ID = ?
//                        GROUP BY A.PRD_NO, P.PRD_NAME, A.CUST_ID, A.AUC_FEE
//                    ) A
//                    JOIN (
//                        SELECT PRD_NO, MAX(AUC_FEE) AS MAX_AUC_FEE
//                        FROM TB_AUCTION
//                        GROUP BY PRD_NO
//                    ) B ON A.PRD_NO = B.PRD_NO;`;
//         conn.query(sql, [], (err, rows) => {
//           if (!err) {
//             console.log(rows);
//             // 조회값으로 값 넘겨주기
//             if (rows.MY_MAX_FEE != rows.MAX_AUC_FEE) {
//               socket.emit("news", "누를때만 데이터가 넘어감");
//               // a = 0;
//             }
//           } else {
//             console.log("DB명령이 제대로 실행되지 않았습니🥲🥲🥲🥲🥲");
//             console.log(err);
//           }
//         });
//       }
//     });

//   });
// };


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
<<<<<<< HEAD
=======

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
    }, 10000);
>>>>>>> 98022b898a043c6a83522188e44ffe3c7c5e304f
  });
};
