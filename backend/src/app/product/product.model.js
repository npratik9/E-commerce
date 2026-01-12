//  brand, description, price, discount(%), afterDiscountAmount, seller, isFeatured, images, status, createdBy, updatedBy, createdAt, updatedAt
const mongoose = require('mongoose')
const {Status} = require("../../config/constants")

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 255,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      default: null,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 10000,
    },
    discount: {
      type: Number,
      min: 0,
      max: 90,
      default: 0,
    },
    afterDiscountAmount: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: Boolean,
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
    },
    images: [{
      id: String,
      optimizedUrl: String,
      originalUrl: String,
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
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel