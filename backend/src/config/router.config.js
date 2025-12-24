const router = require("express").Router();
const authRouter = require("../app/auth/auth.router");
const bannerRouter = require("../app/banner/banner.router");


router.use("/auth", authRouter);
router.use("/banner", bannerRouter)

module.exports = router;
