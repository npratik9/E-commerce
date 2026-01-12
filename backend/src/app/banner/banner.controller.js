class BannerController {
  createBanner (req, res, next) {
    res.json({
      data: null, 
      message: "Banner Created",
      status: "OK"
    })
  }

  listAllBanner(req, res, next) {
    res.json({
      data: null,
      message: "All Banner List",
      status: "OK",
    });
  }

  viewBannerDetailById(req, res, next) {
    const params = req.params;

    res.json({
      data: {params},
      message: "Banner Detail of "+params.id,
      status: "OK",
    });
  }

  updateBannerById(req, res, next) {
    const params = req.params;
    res.json({
      data: { params },
      message: "Banner Update of " + params.id,
      status: "OK",
    });
  }

  delteBannerById(req, res, next) {
    const params = req.params;
    res.json({
      data: { params },
      message: "Banner Delete for " + params.id,
      status: "OK",
    });
  }
}

const bannerCtrl = new BannerController()
module.exports = bannerCtrl
