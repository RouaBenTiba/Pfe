const Joi = require("joi");

const presenceSchema = Joi.object({
  employee: Joi.string().required(),
  date: Joi.date().iso().default(new Date()),
  entryTime: Joi.date().iso().required(),
  exitTime: Joi.date().iso().required(),
  decision: Joi.string().valid("validé", "non validé").default("non validé"),
});
module.exports.validation = {
  presenceSchema,
};
