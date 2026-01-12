const productRouter = require("express").Router()
const productCtrl = require("./product.controller")
const auth = require("../../middleware/auth.middleware")
const { UserRoles } = require("../../config/constants")
const uploader = require("../../middleware/uploader.middleware")
const bodyValidator = require("../../middleware/validator.middleware")
const { ProductDataDTO } = require("./product.request")

// CURD
// List products based on product detail 
productRouter.get("/:slug/by-slug", productCtrl.getProductDetailBySlug)
productRouter.get("/front-list", productCtrl.frontListAllProducts);


// Private route only allowed by Admin
productRouter.post('/', auth([UserRoles.ADMIN, UserRoles.SELLER]), uploader().array('images'), bodyValidator(ProductDataDTO), productCtrl.createProduct)
productRouter.get("/", auth([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.listAllProducts);
productRouter.get("/:id", auth([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.viewProductDetailById)
productRouter.put('/:id', auth([UserRoles.ADMIN, UserRoles.SELLER]), uploader().array('images'),bodyValidator(ProductDataDTO), productCtrl.updateProductById)
productRouter.delete("/:id", auth([UserRoles.ADMIN, UserRoles.SELLER]), productCtrl.deleteProductById);

module.exports = productRouter