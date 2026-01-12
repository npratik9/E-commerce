const categoryRouter = require("express").Router()
const categoryCtrl = require("./category.controller")
const auth = require("../../middleware/auth.middleware")
const { UserRoles } = require("../../config/constants")
const uploader = require("../../middleware/uploader.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const { CategoryDataDTO } = require("./category.request")

// CURD
// List products based on category detail 
categoryRouter.get("/:slug/by-slug", categoryCtrl.getCategoryDetailBySlug)
categoryRouter.get("/front-list", categoryCtrl.frontListAllCategories);


// Private route only allowed by Admin
categoryRouter.post('/', auth([UserRoles.ADMIN]), uploader().single('icon'), bodyValidator(CategoryDataDTO), categoryCtrl.createCategory)
categoryRouter.get("/", auth([UserRoles.ADMIN]), categoryCtrl.listAllCategories);
categoryRouter.get("/:id", auth([UserRoles.ADMIN]), categoryCtrl.viewCategoryDetailById)
categoryRouter.put('/:id', auth([UserRoles.ADMIN]), uploader().single('icon'),bodyValidator(CategoryDataDTO), categoryCtrl.updateCategoryById)
categoryRouter.delete("/:id", auth([UserRoles.ADMIN]), categoryCtrl.deleteCategoryById);

module.exports = categoryRouter