import { Router } from "express"
import CarController from "../controllers/CarController.mjs"
import { checkSchema } from "express-validator"
import CarValidator from "../validators/CarValidator.mjs"

const router = Router()

router.get("/", CarController.loadList)
router.get("/form/:id?", CarController.renderForm)
router.get("/:id", CarController.loadById)

router.post(
  "/update/:id?",
  checkSchema(CarValidator.schema),
  CarController.updateOrCreate
)

router.delete("/", CarController.deleteById)

export default router
