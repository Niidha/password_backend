const { Router } = require("express")
const controller= require("../controller/password.contoller")

const passwordRouter = Router()

passwordRouter.post("/generate", controller.generatePasswordHash)
passwordRouter.post("/verify", controller.verifyPasswordHash)

module.exports = passwordRouter