const brandRouter= require('express').Router()
const brandCtrl= require('./brand.controller')


brandRouter.get("/brand/:slug/by-slug", brandCtrl.getBrandDetailBySlug)


brandRouter.post("/", brandCtrl.createBrand)
brandRouter.get("/", brandCtrl.listAllBrand)
brandRouter.get("/:id", brandCtrl.viewBrandDetailById)
brandRouter.put("/:id", brandCtrl.updateBrandById)
brandRouter.delete("/:id", brandCtrl.deleteBrandById)



module.exports = brandRouter;