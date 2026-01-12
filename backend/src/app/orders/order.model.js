const mongoose = require("mongoose");
const { OrderStatus } = require("../../config/constants");

const OrderSchema = new mongoose.Schema(
  {
    orderCode: {
      type: String, 
      required: true, 
      unique: true
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
    serviceCharge: Number, 
    deliveryCharge: Number,
    total: {
      type: Number,
      required: true,
    },
    isPaid: Boolean,
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
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;
