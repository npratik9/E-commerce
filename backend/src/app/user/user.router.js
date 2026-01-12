const userRouter = require("express").Router()
const userCtrl = require("./user.controller")
const auth = require("../../middleware/auth.middleware")
const { UserRoles } = require("../../config/constants")
const uploader = require("../../middleware/uploader.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const { registerDTO, updateUserProfileDTO } = require("../auth/auth.request")
const authCtrl = require("../auth/auth.controller")


// Private route only allowed by Admin
userRouter.post('/', auth([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(registerDTO), authCtrl.registerUser)

userRouter.get("/", auth(), userCtrl.listAllUsers);
userRouter.get("/:id", auth(), userCtrl.viewUserDetailById)


userRouter.put('/:id', auth([UserRoles.ADMIN]), uploader().single('image'),bodyValidator(updateUserProfileDTO), userCtrl.updateUserById)
userRouter.delete("/:id", auth([UserRoles.ADMIN]), userCtrl.deleteUserById);

module.exports = userRouter