const { default: slugify } = require("slugify");
const cloudinarySvc = require("../../service/cloudinary.service");
const BrandModel = require("./brand.model");

class BrandService {
  async transromToBrand(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.logo = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "brands"
        );
      }
      // slug
      data.slug = slugify(data.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      data.createdBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToBrandForUpdate(req, brand) {
    try {
      const data = req.body;
      if (req.file) {
        data.logo = await cloudinarySvc.singleFileUpload(
          req.file.path,
          "brands"
        );
      }
      data.logo = brand.logo;
      data.updatedBy = req.loggedInUser._id;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeBrand(data) {
    try {
      const brand = new BrandModel(data);
      return brand.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await BrandModel.find(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "address",
          "phone",
          "gender",
          "dob",
          "status",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "address",
          "phone",
          "gender",
          "dob",
          "status",
        ])
        .sort({ createdAt: "desc" })
        .limit(pagination.limit)
        .skip(skip);
      const total = await BrandModel.countDocuments(filter);

      return {
        data,
        pagination: {
          ...pagination,
          total: total,
        },
      };
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {
    try {
      const data = await BrandModel.findOne(filter)
        .populate("createdBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "address",
          "phone",
          "gender",
          "dob",
          "status",
        ])
        .populate("updatedBy", [
          "_id",
          "name",
          "email",
          "role",
          "image",
          "address",
          "phone",
          "gender",
          "dob",
          "status",
        ]);
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const detail = await BrandModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true }
      );
      return detail;
    } catch (exception) {
      throw exception;
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      const detail = await BrandModel.findOneAndDelete(filter);
      return detail;
    } catch (exception) {
      throw exception;
    }
  }
}

module.exports = new BrandService();
