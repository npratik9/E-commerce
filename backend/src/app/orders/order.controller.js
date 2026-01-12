const { OrderStatus } = require('../../config/constants');
const orderDetailSvc = require('../order-details/order-details.service');

class OrderController {
  async placeOrder(req, res, next) {
    try {
      const {cartId, voucherCouponCode, shippingAddress} = req.body; 
      const loggedInUser = req.loggedInuser 

      // Cartid 
      const {data} = await orderDetailSvc.getAllRowsByfilter({
        _id: {$in: cartId},
        order: {$eq: null},
        buyer: loggedInUser._id, 
        status: OrderStatus.PENDING
      })

      // 
      if(cartId.length !== data.length) {
        throw {code: 422, message: "All cart items does not exists in your collection", code: "CART_NOT_FOUND_ERR"}
      }

      // Cart items => order 
    } catch(exception) {
      next(exception)
    }
  }
}

module.exports = new OrderController()