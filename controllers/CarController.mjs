import CarManager from "../models/CarManager.mjs"
import { validationResult } from "express-validator"

class CarController {
  static async loadList(req, res) {
    try {
      const cars = await CarManager.getList()
      res.render("cars", {
        cars,
      })
    } catch (error) {
      res.status(500).render("error", {
        error,
      })
    }
  }
  static async loadById(req, res) {
    try {
      const car = await CarManager.getById(req.params.id)
      if (!car) throw new Error(`Car by ID ${req.params.id} not found`)
      res.render("cars/carDetail", { car })
    } catch (error) {
      res.status(500).render("error", {
        error,
      })
    }
  }
  static async renderForm(req, res) {
    const { id } = req.params
    let car = null
    try {
      if (id) {
        car = await CarManager.getById(id)
        if (!car) throw new Error(`Car by ID ${req.params.id} not found`)
      }
      res.render("cars/carForm", {
        car,
        errors: [],
      })
    } catch (error) {
      res.status(500).render("error", {
        error,
      })
    }
  }
  static async updateOrCreate(req, res) {
    const { id } = req.params
    const { brand, model, year_of_production, plate_number } = req.body
    const car = { brand, model, year_of_production, plate_number }
    if (id) car.id = id
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("cars/carForm", {
        errors: errors.array(),
        car,
      })
    }
    try {
      if (id) {
        await CarManager.updateById(id, {
          brand,
          model,
          year_of_production,
          plate_number,
        })
      } else {
        await CarManager.create({
          brand,
          model,
          year_of_production,
          plate_number,
        })
      }
      res.redirect("/cars")
    } catch (error) {
      res.status(500).render("cars/carForm", {
        car,
        errors: [{ msg: error.message }],
      })
    }
  }
  static async deleteById(req, res) {
    const { id } = req.body
    try {
      const deletedId = await CarManager.deleteById(id)
      if (!deletedId)
        return res.status(404).json({ success: false, msg: "Car not found" })
      res.json({ success: true })
    } catch (error) {
      res.status(500).render("error", {
        error,
      })
    }
  }
}

export default CarController
