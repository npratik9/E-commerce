const mongoose = require("mongoose");
const { Status } = require("../../config/constants");
const BrandSchema = new mongoose.Schema(
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
    isFeatured: Boolean,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    logo: {
      id: String,
      optimizedUrl: String,
      originalUrl: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const BrandModel = mongoose.model("Brand", BrandSchema);
module.exports = BrandModel;
