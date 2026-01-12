const { OrderStatus } = require("../../config/constants");
const productService = require("../product/product.service");
const orderDetailsService = require("./order-details.service");

class OderDetailController {

  async addToCart(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser; 
      const {productId, quantity} = req.body;

      // productDetail 
      const productDetail = await productService.getSingleRowByFilter({
        _id: productId
      })
      if(!productDetail) {
        throw { code: 404, message: "Product not found", status: "PRODUCT_NOT_FOUND"}
      }

      // cart add 
      let cartExists = await orderDetailsService.getSingleRowByFilter({
        order: {$eq: null},
        status: OrderStatus.PENDING,
        product: productId,
        buyer: loggedInUser._id
      })

      if(cartExists) {
        // +'1' => 1
        cartExists.quantity += +quantity
        cartExists.price = productDetail.afterDiscountAmount;
        cartExists.subtotal = cartExists.quantity * productDetail.afterDiscountAmount;
        cartExists.tax = cartExists.subtotal * 0.13;
        cartExists.total = cartExists.subtotal + cartExists.tax;

        await cartExists.save()
        res.json({
          data: cartExists, 
          message: "Your cart item updated",
          status: "OK"
        })

      } else {
        // new entry for the cart 
        let cartObj = {
          order: null,
          buyer: loggedInUser._id,
          product: productDetail._id,
          quantity: quantity,
          price: productDetail.afterDiscountAmount,
          subtotal: quantity * productDetail.afterDiscountAmount,
          tax: quantity * productDetail.afterDiscountAmount * 0.13,
          total:
            quantity * productDetail.afterDiscountAmount +
            quantity * productDetail.afterDiscountAmount * 0.13,
          seller: productDetail.seller?._id,
          status: OrderStatus.PENDING,
          createdBy: req.loggedInUser._id, 
        };
        cartObj = await orderDetailsService.addToCart(cartObj)
        
        res.json({
          data: cartObj,
          message: "Add to cart success",
          status: "OK",
        });
      }

    } catch(exception) {
      next(exception)
    }
  }

  async viewMyCart(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      const {data, pagination} = await orderDetailsService.getAllRowsByfilter({
          buyer: loggedInUser._id, 
          order: null, 
          status: OrderStatus.PENDING
      })

      res.json({
        data: data, 
        message: "Your cart",
        status: "OK",
        meta: {pagination}
      })
    } catch(exception) {
      next(exception)
    }
  }

  async updateMyCart(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser; 
      const {productId, quantity} = req.body;

      // productDetail 
      const productDetail = await productService.getSingleRowByFilter({
        _id: productId
      })
      if(!productDetail) {
        throw { code: 404, message: "Product not found", status: "PRODUCT_NOT_FOUND"}
      }

      // cart add 
      let cartExists = await orderDetailsService.getSingleRowByFilter({
        order: {$eq: null},
        status: OrderStatus.PENDING,
        product: productId,
        buyer: loggedInUser._id
      })

      if(cartExists) {

        if(+quantity > cartExists.quantity) {
          throw {data: null, code: 422, message: "Cart quantity should be less than existing available quantity", status: "CART_QUANTITY_LESS"}
        }
        
        if (+quantity === 0 || +quantity === +cartExists.quantity) {
          //
          await orderDetailsService.removeFromCart({ _id: cartExists._id });
          res.json({
            data: null,
            message: "Cart Item removed successfully...",
            status: "OK",
          });
        } else {
          cartExists.quantity -= +quantity;
          cartExists.price = productDetail.afterDiscountAmount;

          cartExists.subtotal =
            cartExists.quantity * productDetail.afterDiscountAmount;
          cartExists.tax = cartExists.subtotal * 0.13;
          cartExists.total = cartExists.subtotal + cartExists.tax;

          await cartExists.save();
          res.json({
            data: cartExists,
            message: "Your cart item updated",
            status: "OK",
          });
        }

      } else {
        throw {code: 404, message: "Cart not found", status: "CART_NOT_FOUND"}
      }
    } catch(exception) {
      next(exception)
    }
  }
}

const orderDetailCtrl = new OderDetailController()
module.exports = orderDetailCtrl