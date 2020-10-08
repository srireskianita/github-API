const joi = require('joi');

const repository = joi.object({
  name:joi.string().required(),
  description:joi.string(),
  visibility : joi.string().required()
});

module.exports = {
  repository
};
