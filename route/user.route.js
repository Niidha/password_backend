const { Router } = require("express")
const controller = require("../controller/user.controller")

const userRouter = Router()

userRouter.post("/user", controller.createUser)
userRouter.get("/user", controller.loginUser)

module.exports = userRouter