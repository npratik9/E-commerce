const authRouter= require('express').Router()
const auth = require('../../middleware/auth.middleware')
const bodyValidator = require('../../middleware/validator.middleware')
const {registerDTO,updateMyProfileDTO,loginDTO}= require("./auth.request")
const authCtrl= require('./auth.controller')


authRouter.post("/register", bodyValidator(registerDTO), authCtrl.registerUser)
authRouter.get("/activate/:token", authCtrl.activateUser)
authRouter.get("/resend-token/:token", authCtrl.resendToken)
authRouter.post("/login", bodyValidator(loginDTO), authCtrl.loginUser)

// access only by logged in user
authRouter.get("/me", auth(), authCtrl.getLoggedInUser)
authRouter.get("/logout", auth(), authCtrl.logOut)

// update for user profile
authRouter.put("/my-profile",auth(), bodyValidator(updateMyProfileDTO) ,authCtrl.updateUserProfile)


module.exports = authRouter;