const Joi = require("joi");
const { UserRoles } = require("../../config/constants");
const bodyValidator = require("../../middleware/validator.middleware");
const orderDetailCtrl = require("./order-details.controller");
const OrderDetailRouter = require("express").Router();
const auth = require("../../middleware/auth.middleware")

const CartDTO = Joi.object({
  productId: Joi.string().required(), 
  quantity: Joi.number().min(0).required()
})


OrderDetailRouter.post("/add-to-cart", auth([UserRoles.ADMIN, UserRoles.CUSTOMER]), bodyValidator(CartDTO), orderDetailCtrl.addToCart)
OrderDetailRouter.get("/my-cart", auth([UserRoles.ADMIN, UserRoles.CUSTOMER]), orderDetailCtrl.viewMyCart)

// quantity = current item count in my cart 
// quanity = 0 
// -------------------------------------------
// Remove from cart 
OrderDetailRouter.put('/update-my-cart', auth([UserRoles.ADMIN, UserRoles.CUSTOMER]), bodyValidator(CartDTO), orderDetailCtrl.updateMyCart)

module.exports = OrderDetailRouter