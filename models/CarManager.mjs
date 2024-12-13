import pool from "../db/connectDB.mjs"
class CarManager {
  static async getList() {
    try {
      const query = "SELECT * FROM cars"
      const [rows] = await pool.query(query)
      return rows
    } catch (error) {
      console.log("Error fetching data " + error.message)
      throw error
    }
  }
  static async getById(id) {
    try {
      const query = "SELECT * FROM cars WHERE id = ?"
      const [rows] = await pool.query(query, [id])
      return rows[0] || null
    } catch (error) {
      console.log("Error fetching item by ID " + error.message)
      throw error
    }
  }
  static async create(itemObj) {
    try {
      const query = "INSERT INTO cars SET ?"
      const [row] = await pool.query(query, itemObj)
      return { id: row.insertId, ...itemObj }
    } catch (error) {
      console.log("Error creating item " + error.message)
      throw error
    }
  }
  static async updateById(id, itemObj) {
    try {
      const query = "UPDATE cars SET ? WHERE id = ?"
      const [result] = await pool.query(query, [itemObj, id])
      if (result.affectedRows === 0) return null
      return { id, ...itemObj }
    } catch (error) {
      console.log("Error updating item by ID " + error.message)
      throw error
    }
  }
  static async deleteById(id) {
    try {
      const query = "DELETE FROM cars WHERE id = ?"
      const [result] = await pool.query(query, [id])
      if (result.affectedRows === 0) return null
      return { id }
    } catch (error) {
      console.log("Error deleting item by ID " + error.message)
      throw error
    }
  }
}

export default CarManager
