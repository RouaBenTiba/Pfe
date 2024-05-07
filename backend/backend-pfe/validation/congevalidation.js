const Joi = require("joi");
const congeSchema = Joi.object({
  user: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).required(),
  status: Joi.string()
    .valid("en attente", "approuvé", "rejeté")
    .default("en attente"),
  typeConge: Joi.string()
    .valid("vacances", "maladie", "maternité", "autre")
    .required(),
});
module.exports.validation = {
  congeSchema,
};
