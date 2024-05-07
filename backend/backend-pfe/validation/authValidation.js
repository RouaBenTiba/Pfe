const Joi = require("joi");
const schemaRegisterValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  tel: Joi.string().required(),
  role: Joi.number().valid(0, 1),
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");

const schemaLoginValidation = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  password: Joi.string(),
});

module.exports.authValidation = {
  schemaLoginValidation,
  schemaRegisterValidation,
};
