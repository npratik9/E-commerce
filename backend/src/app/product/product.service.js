const { default: slugify } = require("slugify");
const cloudinarySvc = require("../../service/cloudinary.service");
const ProductModel = require("./product.model");
const { randomStringGenerate } = require("../../utilities/helpers");

class ProductService {
  async transfromToProduct(req) {
    try {
      const data = req.body;

      if (req.files) {
        data.images = await cloudinarySvc.multipleFileUpload(req.files, 'products')
      }

      // slug
      data.slug = slugify(data.name+"-"+randomStringGenerate(10), { lower: true, remove: /[*+~.()'"!:@]/g });
      data.createdBy = req.loggedInUser._id;

      // validating foreign key
      if(!data.category || data.category === "" || data.category === 'null') {
        data.category = null
      }
      if (!data.brand || data.brand === "" || data.brand === "null") {
        data.brand = null;
      }
      if (!data.seller || data.seller === "" || data.seller === "null") {
        data.seller = req.loggedInUser._id;
      }
      

      // price 
      data.price = data.price * 100
      data.afterDiscountAmount = data.price - data.price * data.discount / 100;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transfromToProductForUpdate(req, product) {
    try {
      const data = req.body;
      let images = [];
      if (req.files) {
        images = await cloudinarySvc.multipleFileUpload(
          req.files,
          "products"
        );
      }

      data.images = [...images, ...product.images]

      // slug
      data.updatedBy = req.loggedInUser._id;

      // validating foreign key
      if (!data.category || data.category === "" || data.category === "null") {
        data.category = null;
      }
      if (!data.brand || data.brand === "" || data.brand === "null") {
        data.brand = null;
      }
      if (!data.seller || data.seller === "" || data.seller === "null") {
        data.seller = req.loggedInUser._id;
      }

      // price
      data.price = data.price * 100;
      data.afterDiscountAmount = data.price - (data.price * data.discount) / 100;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async storeProduct(data) {
    try {
      const product = new ProductModel(data);
      return product.save();
    } catch (exception) {
      throw exception;
    }
  }

  async getAllRowsByFilter(filter, pagination) {
    try {
      let skip = (pagination.page - 1) * pagination.limit;

      const data = await ProductModel.find(filter)
        .populate('category', ['_id','name','slug','icon','brands','status'])
        .populate('brand', ['_id','name','slug','icon','brands','status'])
        .populate("seller", ["_id","name","email","role","image","address","phone","gender","dob","status"])
        .populate("createdBy", ["_id","name","email","role","image","address","phone","gender","dob","status"])
        .populate("updatedBy", ["_id","name","email","role","image","address","phone","gender","dob","status"])
        .sort({ createdAt: "desc" })
        .limit(pagination.limit)
        .skip(skip);
      const total = await ProductModel.countDocuments(filter);

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
      const data = await ProductModel.findOne(filter)
        .populate('category', ['_id','name','slug','icon','brands','status'])
        .populate('brand', ['_id','name','slug','icon','brands','status'])
        .populate("seller", ["_id","name","email","role","image","address","phone","gender","dob","status"])
        .populate("createdBy", ["_id","name","email","role","image","address","phone","gender","dob","status"])
        .populate("updatedBy", ["_id","name","email","role","image","address","phone","gender","dob","status"])
      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      const detail = await ProductModel.findOneAndUpdate(
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
      const detail = await ProductModel.findOneAndDelete(filter);
      return detail;
    } catch (exception) {
      throw exception;
    }
  }
} 

module.exports = new ProductService()