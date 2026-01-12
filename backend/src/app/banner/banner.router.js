const bannerRouter = require("express").Router()
const bannerCtrl = require("./banner.controller")


bannerRouter.post('/', bannerCtrl.createBanner)
bannerRouter.get("/", bannerCtrl.listAllBanner);
bannerRouter.get("/:id", bannerCtrl.viewBannerDetailById)
bannerRouter.put('/:id', bannerCtrl.updateBannerById)
bannerRouter.delete("/:id", bannerCtrl.delteBannerById)

module.exports = bannerRouter