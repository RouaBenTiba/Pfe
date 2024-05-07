const Joi = require("joi");
const planningvalid = Joi.object({
  user: Joi.string().required(),
  day: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )
    .required(),
  message: Joi.string(),
});
module.exports.validation = {
  planningvalid,
};
