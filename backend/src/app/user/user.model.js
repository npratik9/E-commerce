const mongoose = require("mongoose");
const { UserRoles, Status ,Gender} = require("../../config/constants");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.CUSTOMER,
    },

    image: {
      id: String,
      optimizedUrl: String,
      originalUrl: String,
    },

    address: String,

    dob: Date,

    phone: String,

    gender: {
      type: String,
      enum: Object.values(Gender),
    },

    activationToken: String,

    expiry: Date,

    forgetToken: String,

    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.INACTIVE,
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

//schema to model
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;