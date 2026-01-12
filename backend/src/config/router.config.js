const router = require("express").Router();
const authRouter = require("../app/auth/auth.router");
const bannerRouter = require("../app/banner/banner.router");
const brandRouter = require("../app/brands/brand.router");
const categoryRouter = require("../app/category/category.router");
const userRouter= require("../app/user/user.router")
const productRouter = require("../app/product/product.router");
const OrderDetailRouter = require("../app/order-details/order-details.router");
const orderRouter = require("../app/orders/order.router");


router.use("/auth", authRouter);
router.use("/banner", bannerRouter);
router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/order-detail", OrderDetailRouter);
router.use("/order", orderRouter);


module.exports = router;
