const { Status } = require("../../config/constants");
const brandService = require("./brand.service");

class BrandController {
  async createBrand(req, res, next) {
    try {
      const data = await brandService.transromToBrand(req);
      const brand = await brandService.storeBrand(data);

      res.status(201).json({
        data: brand,
        message: "Brand Created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllBrand(req, res, next) {
    try {
      // filter and pagination
      let filter = {};

      if (req.query.search) {
        filter = {
          name: new RegExp(req.query.search, "i"),
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      // pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 20;

      const { data, pagination } = await brandService.getAllRowsByFilter(
        filter,
        { page, limit }
      );
      res.json({
        data: data,
        message: "All Brand List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async frontListAllBrand(req, res, next) {
    let filter = {
      status: Status.ACTIVE,
    };

    if (req.query.search) {
      filter = {
        ...filter,
        name: new RegExp(req.query.search, "i"),
      };
    }

    if (+req.query.isFeatured === 1) {
      filter = {
        ...filter,
        isFeatured: true,
      };
    } else if (+req.query.isFeatured === 0) {
      filter = {
        ...filter,
        isFeatured: false,
      };
    }
    // pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    const { data, pagination } = await brandService.getAllRowsByFilter(filter, {
      page,
      limit,
    });
    res.json({
      data: data,
      message: "All Brand List",
      status: "OK",
      meta: { pagination },
    });
    res.json({
      data: null,
      message: "All Brand List",
      status: "OK",
    });
  }

  async viewBrandDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await brandService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }
      res.json({
        data: detail,
        message: "Brand Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getBrandDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE,
        slug: req.params.slug,
      };
      let detail = await brandService.getSingleRowByFilter(filter);
      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }

      // TODO: fetch products for this brand
      res.json({
        detail: {
          brand: detail,
          products: null,
        },
        message: "Brand Detail by Slug",
        status: "OK",
        meta: {
          pagination: {
            page: 1,
            limit: 20,
            total: 0,
          },
        },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async updateBrandById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await brandService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }
      const data = await brandService.transfromToBrandForUpdate(req, detail);
      detail = await brandService.updateSingleRowByFilter({ _id: id }, data);

      res.json({
        data: detail,
        message: "Brand Updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteBrandById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await brandService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Brand not found", status: "NOT_FOUND" };
      }
      await brandService.deleteSingleRowByFilter({ _id: id });
      res.json({
        data: null,
        message: "Brand Delete",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const brandCtrl = new BrandController();
module.exports = brandCtrl;
