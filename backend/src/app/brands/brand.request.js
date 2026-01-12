const Joi = require("joi");
const { Status } = require("../../config/constants");

const BrandDataDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  isFeatured: Joi.boolean().optional().default(false),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE),
  logo: Joi.string().allow(null, "").optional().default(null),
});

module.exports = {
  BrandDataDTO
}