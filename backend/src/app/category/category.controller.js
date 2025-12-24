class CategoryController {
  createCategory = (req, res, next) => {
    res.status(200).json({
      data: "category created",
      message: "category has been successfully created",
      status: "ok",
    });
  };

  listAllCategories = (req, res, next) => {
    res.status(200).json({
      data: null,
      message: "List of all categories",
      status: "ok",
    });
  };

  viewCategoryDetailById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "category details by Id " + params.id,
      status: "ok",
    });
  };

  getCategoryDetailBySlug = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "category details by Id " + params.slug,
      status: "ok",
    });
  };

  updateCategoryById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "Updating category of " + params.id,
      status: "ok",
    });
  };

  deleteCategoryById = (req, res, next) => {
    const params = req.params;
    res.json({
      data: { params },
      mesage: "Deleting category of " + params.id,
      status: "ok",
    });
  };
}

const categoryCtrl = new CategoryController;

module.exports = categoryCtrl;
