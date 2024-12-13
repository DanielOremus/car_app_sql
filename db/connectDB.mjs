import mysql from "mysql2/promise"
import config from "../config/default.mjs"
async function connectToDB() {
  try {
    const pool = await mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      database: config.db.database,
      password: config.db.password,
      port: config.db.port,
    })
    console.log("Successfully connected to DB")
    return pool
  } catch (error) {
    console.log("Error while connecting to DB")
    console.log(error.message)
  }
}

const pool = await connectToDB()

export default pool
