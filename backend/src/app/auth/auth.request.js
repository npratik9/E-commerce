const Joi= require('joi')
//rules
const registerDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().allow("owner", "user").default('user')
})

const updateMyProfileDTO = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(2).max(250).required(),
  gender: Joi.string().allow('male','female','other').required(),
  dob: Joi.date().less('now').required(),
  image: Joi.string().allow(null, "").optional().default(null)
});

const loginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports= {
    registerDTO,
    updateMyProfileDTO,
    loginDTO
}