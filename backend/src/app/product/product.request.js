const Joi = require("joi");
const { Status } = require("../../config/constants");

const ProductDataDTO = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  category: Joi.string().allow(null, "").optional().default(null),
  description: Joi.string().allow(null, "").optional().default(null),
  price: Joi.number().min(100).required(),
  discount: Joi.number().min(0).max(90).default(0),
  brand: Joi.string().allow(null, "").optional().default(null),
  seller: Joi.string().allow(null, '').optional().default(null),
  isFeatured: Joi.boolean().optional().default(false),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  images: Joi.string().allow(null, "").optional().default(null),
});

module.exports = {
  ProductDataDTO
}