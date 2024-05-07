const Joi = require("joi");

const profileValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  tel: Joi.string().required(),
  password: Joi.string().required(),
  country: Joi.string(),
}).with("password", "repeat_password");
module.exports.validation = {
  profileValidation,
};
