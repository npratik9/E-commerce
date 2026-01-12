const Joi = require("joi");
const { Status } = require("../../config/constants");

const CategoryDataDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  parentId: Joi.string().allow(null,'').optional().default(null),
  isFeatured: Joi.boolean().optional().default(false),
  status: Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
  brands: Joi.array().items(
    Joi.string().allow(null, '').optional().default(null)
  ).allow(null, '').optional().default(null),
  icon: Joi.string().allow(null, "").optional().default(null),
});

module.exports = {
  CategoryDataDTO
}