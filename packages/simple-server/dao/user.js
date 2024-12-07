import dayjs from "dayjs"
import { customAlphabet } from 'nanoid';

import { query } from "../common/mysql.js"
import { daoErrorHandler } from "../utils/dao-error.js";

export class UserDAO {
  async register(body) {
    const { username, password } = body
    const keys = ['user_id', 'username', 'password', 'create_time']
    const sqlKeys = keys.join(",")
    const sqlValues = keys.map(() => '?').join(",")
    const sql = `INSERT INTO user(${sqlKeys}) VALUES(${sqlValues})`
    const time = dayjs().format()
    const id =  customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 10)();
    const params = [id, username, password, time].map(String)
    const result = await daoErrorHandler(() => query(sql, params) )
    return result
  }

  async login(body) {
    const { username, password } = body
    const sql = `SELECT u.user_id, u.username, u.create_time, u.disable, u.role_id, r.role FROM user AS u JOIN role AS r ON u.role_id = r.role_id WHERE u.username = ? AND u.password = ? LIMIT 1`
    const params = [ username, password ]
    const result = await daoErrorHandler(() => query(sql, params))
    return result
  }

  async findAll(page=1, size=10) {
    const sql = `SELECT u.user_id, u.username, u.create_time, u.disable, u.role_id, r.role FROM user AS u JOIN role AS r ON u.role_id = r.role_id ORDER BY u.create_time DESC LIMIT ?,?`
    const params = [(page - 1) * size, size].map(String)
    const result = await daoErrorHandler(() => query(sql, params))
    return result
  }
  
  async disable(id, disable = 1) {
    const sql = `UPDATE user SET disable = ? WHERE user_id = ? LIMIT 1`
    const params = [disable, id].map(String)
    const result = await daoErrorHandler(() => query(sql, params))
    return result
  }

   async findOne(id) {
    const sql = `SELECT user_id, username, create_time, disable, role_id FROM user WHERE user_id = ? LIMIT 1`
    const params = [id].map(String)
    const result = await daoErrorHandler(() =>  query(sql, params))
    return result
  }
}