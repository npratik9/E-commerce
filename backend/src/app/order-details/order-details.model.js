const mongoose = require("mongoose")
const OrderModel = require("../orders/order.model")
const { OrderStatus } = require("../../config/constants")

const OrderDetailSchema = new mongoose.Schema(
  {
    //
    order: {
      type: mongoose.Types.ObjectId,
      ref: "Order", 
      default: null, 
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
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
    autoCreate: true, 
    autoIndex: true, 
    timestamps: true
  }
);

const OrderDetailModel = mongoose.model("OrderDetail", OrderDetailSchema)
module.exports = OrderDetailModel