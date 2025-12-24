const categoryRouter= require('express').Router()
const categoryCtrl= require('./category.controller')


categoryRouter.get("/category/:slug/by-slug", categoryCtrl.getCategoryDetailBySlug)


categoryRouter.post("/", categoryCtrl.createCategory)
categoryRouter.get("/", categoryCtrl.listAllCategories)
categoryRouter.get("/:id", categoryCtrl.viewCategoryDetailById)
categoryRouter.put("/:id", categoryCtrl.updateCategoryById)
categoryRouter.delete("/:id", categoryCtrl.deleteCategoryById)



module.exports = categoryRouter;