// 导入模块
// import mysql from 'mysql2/promise';
import mysql from 'mysql2';

// 创建连接池，设置连接池的参数
const pool = mysql.createPool({
  host: 'localhost', // 主机地址
  user: 'root', // 用户名
  database: 'simple', // 数据库名称
  password: '12345678', // 密码
  port: 3308, // 端口号
  connectionLimit: 1000, // 最大连接数
  queueLimit: 0, // 排队等待连接的最大请求数，0表示无限制
  waitForConnections: true, // 当连接池达到最大连接时，是否等待可用连接
  charset: 'utf8mb4_general_ci' // 连接字符集
});

// 封装执行函数 -- 使用预处理语句
export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err instanceof Error) {
        reject(err)
        return
      }
      connection.execute(sql, params, function(err, results) {
        if(err) {
          reject(err)
        }else {
          resolve(results)
        }
        pool.releaseConnection(connection)
      })
    })
  })
}
