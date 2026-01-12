const { Status, UserRoles } = require("../../config/constants");
const userService = require("./user.service");

class UserController {
  async listAllUsers(req, res, next) {
    try {
      // filter and pagination
      let filter = {
        _id: {$ne: req.loggedInUser._id}
      };

      if (req.query.search) {
        filter = {
          ...filter,
          $or: [
              {name: new RegExp(req.query.search, "i")},
              {email: new RegExp(req.query.search, "i")},
              {phone: new RegExp(req.query.search, "i")},
              {address: new RegExp(req.query.search, "i")}
            ],
        };
      }

      if (req.query.status) {
        filter = {
          ...filter,
          status: req.query.status,
        };
      }

      if (req.query.role) {
        filter = {
          ...filter,
          role: req.query.role,
        };
      }

      if (req.query.gender) {
        filter = {
          ...filter,
          gender: req.query.gender,
        };
      }

      // pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 20;

      const { data, pagination } = await userService.getAllRowsByFilter(
        filter,
        { page, limit }
      );
      res.json({
        data: data,
        message: "All User List",
        status: "OK",
        meta: { pagination },
      });
    } catch (exception) {
      next(exception);
    }
  }

  async viewUserDetailById(req, res, next) {
    try {
      const id = req.params.id;
      const detail = await userService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "User not found", status: "NOT_FOUND" };
      }
      res.json({
        data: userService.getUserProfile(detail),
        message: "User Detail",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getUserDetailBySlug(req, res, next) {
    try {
      const filter = {
        status: Status.ACTIVE,
        slug: req.params.slug,
      };
      let detail = await userService.getSingleRowByFilter(filter);
      if (!detail) {
        throw { code: 404, message: "User not found", status: "NOT_FOUND" };
      }

      // TODO: fetch products for this user
      res.json({
        detail: {
          user: detail,
          products: null,
        },
        message: "User Detail by Slug",
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

  async updateUserById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await userService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "User not found", status: "NOT_FOUND" };
      }
      const data = await userService.transfromUserForUpdate(req, detail);
      detail = await userService.updateSingleRowByFilter({ _id: id }, data);

      res.json({
        data: detail,
        message: "User Updated",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const id = req.params.id;
      let detail = await userService.getSingleRowByFilter({
        _id: id,
      });
      if (!detail) {
        throw { code: 404, message: "User not found", status: "NOT_FOUND" };
      }

      //
      if(detail.role === UserRoles.ADMIN) {
        throw {code: 403, message: "Admin cannot be deleted", status: "PERMISSION_DENIED"}
      }

      await userService.deleteSingleRowByFilter({ _id: id });
      res.json({
        data: null,
        message: "User Deleted",
        status: "OK",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const userCtrl = new UserController()
module.exports = userCtrl
