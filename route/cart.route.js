const { Router } = require("express")
const controller = require("../controller/cart.controller")

const cartRouter = Router()

cartRouter.post("/", controller.addToCart)
cartRouter.get("/", controller.getCart)
cartRouter.delete("/:id", controller.removeCart)
cartRouter.patch("/:id", controller.updateCart)

module.exports = cartRouter