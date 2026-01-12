const mongoose = require('mongoose')
const {Status} = require("../../config/constants")
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 100,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: mongoose.Types.ObjectId, 
      ref: "Category",
      default: null
    },
    isFeatured: Boolean,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    icon: {
      id: String,
      optimizedUrl: String,
      originalUrl: String,
    },
    brands: [{
      type: mongoose.Types.ObjectId, 
      ref: "Brand",
      default: null
    }],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    }
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel