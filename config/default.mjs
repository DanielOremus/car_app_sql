import dotenv from "dotenv"
dotenv.config()

export default Object.freeze({
  db: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
  },
  port: process.env.PORT,
})
