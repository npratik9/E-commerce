class BrandController {
  createBrand = (req, res, next) => {
    res.status(200).json({
      data: "brand created",
      message: "brand has been c=successfully created",
      status: "ok",
    });
  };

  listAllBrand = (req, res, next) => {
    res.status(200).json({
      data: null,
      message: "List of all brands",
      status: "ok",
    });
  };

  viewBrandDetailById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "brand details by Id " + params.id,
      status: "ok",
    });
  };

  getBrandDetailBySlug = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "brand details by Id " + params.slug,
      status: "ok",
    });
  };

  updateBrandById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "Updating brand of " + params.id,
      status: "ok",
    });
  };

  deleteBrandById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "Deleting brand of " + params.id,
      status: "ok",
    });
  };
}

const brandCtrl = new BrandController;

module.exports = brandCtrl;
