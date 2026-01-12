const brandRouter = require("express").Router()
const brandCtrl = require("./brand.controller")
const auth = require("../../middleware/auth.middleware")
const { UserRoles } = require("../../config/constants")
const uploader = require("../../middleware/uploader.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const { BrandDataDTO } = require("./brand.request")

// CURD
// List products based on brand detail 
brandRouter.get("/:slug/by-slug", brandCtrl.getBrandDetailBySlug)
brandRouter.get("/front-list", brandCtrl.frontListAllBrand);


// Private route only allowed by Admin
brandRouter.post('/', auth([UserRoles.ADMIN]), uploader().single('logo'), bodyValidator(BrandDataDTO), brandCtrl.createBrand)
brandRouter.get("/", auth([UserRoles.ADMIN]), brandCtrl.listAllBrand);
brandRouter.get("/:id", auth([UserRoles.ADMIN]), brandCtrl.viewBrandDetailById)
brandRouter.put('/:id', auth([UserRoles.ADMIN]), uploader().single('logo'),bodyValidator(BrandDataDTO), brandCtrl.updateBrandById)
brandRouter.delete("/:id", auth([UserRoles.ADMIN]), brandCtrl.deleteBrandById);

module.exports = brandRouter