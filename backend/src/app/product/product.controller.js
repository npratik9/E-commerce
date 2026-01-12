const { Status, UserRoles } = require("../../config/constants");
const productService = require("./product.service");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const data = await productService.transfromToProduct(req);
      const product = await productService.storeProduct(data);

      res.status(201).json({
        data: product,
        message: "Product Created",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAllProducts(req, res, next) {
    try {
      // filter and pagination
      let filter = {};
      if(req.loggedInUser.role === UserRoles.SELLER) {
        filter = {
          $or: [
            { seller: req.loggedInUser._id },
            { createdBy: req.loggedInUser._id },
          ],
        };
      }

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
            { name: new RegExp(req.query.search, "i") },
            { description: new RegExp(req.query.search, "i") },
          ],
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

      const { data, pagination } = await productService.getAllRowsByFilter(
        filter,
        { page, limit }
      );
      res.json({
        data: data,
        message: "All Product List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async frontListAllProducts(req, res, next) {
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

    const { data, pagination } = await productService.getAllRowsByFilter(filter, {
      page,
      limit,
    });
    res.json({
      data: data,
      message: "All Product List",
      status: "OK",
      meta: { pagination },
    });
    res.json({
      data: null,
      message: "All Product List",
      status: "OK",
    });
  }

  async viewProductDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await productService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }
      res.json({
        data: detail,
        message: "Product Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getProductDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE, 
        slug: req.params.slug
      }
      let detail = await productService.getSingleRowByFilter(filter);
      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }

      // TODO: fetch products for this product 
      res.json({
        detail: {
          product: detail, 
          products: null
        },
        message: "Product Detail by Slug",
        status: "OK",
        meta: {pagination: {
          page: 1, 
          limit: 20, 
          total: 0
        }}
      })
    } catch(exception) {
      next(exception)
    }
  }

  async updateProductById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await productService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }
      const data = await productService.transfromToProductForUpdate(req, detail);
      detail = await productService.updateSingleRowByFilter({ _id: id }, data);

      res.json({
        data: detail,
        message: "Product Updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await productService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "Product not found", status: "NOT_FOUND" };
      }
      await productService.deleteSingleRowByFilter({_id: id});
      res.json({
        data: null,
        message: "Product Delete",
        status: "OK",
      });
    } catch(exception) {
      next(exception)
    }
  }
}

const productCtrl = new ProductController()
module.exports = productCtrl
