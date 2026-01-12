const Joi= require('joi')
const roleRegex = /^(owner|customer)$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,25}$/;
//rules
const registerDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required().messages({
        "string.pattern.base": "password must incorporate strong password check"
    }),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().regex(roleRegex).default('customer').messages({
         "string.pattern.base": "Role can only be owner or custormer"
    }),
    image: Joi.string()
})

const updateMyProfileDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(2).max(250).required(),
  gender: Joi.string().allow('male','female','other').required(),
  dob: Joi.date().less('now'),
  image: Joi.string().allow(null, "").optional().default(null)
});

const updateUserProfileDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(2).max(250).required(),
  gender: Joi.string().allow("male", "female", "other").required(),
  dob: Joi.date().less("now").required(),
  role: Joi.string()
    .regex(/^(admin|seller|customer)$/)
    .required()
    .messages({
      "string.pattern.base": "Role can be 'admin', 'seller' or 'customer' ",
    }),
  phone: Joi.string().optional().allow(null, "").default(null),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .required()
    .messages({
      "string.pattern.base": "Status can be either active or inactive ",
    }),
  image: Joi.string().allow(null, "").optional().default(null),
});

const loginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports= {
    registerDTO,
    updateMyProfileDTO,
    updateUserProfileDTO,
    loginDTO
}