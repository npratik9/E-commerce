const authRouter= require('express').Router()
const authCtrl= require('./auth.controller')

authRouter.post("/register", authCtrl.registerUser)
authRouter.get("/activate/:token", authCtrl.activateUser)
authRouter.get("/resend-token/:token", authCtrl.resendToken)
authRouter.post("/login", authCtrl.loginUser)

// access only by logged in user
authRouter.get("/me", authCtrl.getLoggedInUser)
authRouter.get("/logout", authCtrl.logOut)

// update for user profile
authRouter.put("/my-profile", authCtrl.updateUserProfile)


module.exports = authRouter;