//config: 개발에 관련된 환경설정에 대한 정보를 관리한다!
const mysql = require("mysql2");
require("dotenv").config();
let conn = {
  host: "project-db-stu3.smhrd.com",
  user: "Insa4_JSA_hacksim_2",
  password: process.env.DB_PASSWORD,
  port: "3307",
  database: "Insa4_JSA_hacksim_2",
};

module.exports = {
  init: () => {
    return mysql.createConnection(conn);
  },
};
