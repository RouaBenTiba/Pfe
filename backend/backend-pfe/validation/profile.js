const Joi = require("joi");

const profileValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "fr"] },
  }),
  photo: Joi.string().uri().optional(),
  password: Joi.string().required(),
  residence: Joi.string(),
  repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");
module.exports.validation = {
  profileValidation,
};
