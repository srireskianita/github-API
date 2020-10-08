const joi = require('joi');

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  isActive : joi.boolean().default(true, 'Example If Need Default Value')
});

const user = joi.object({
  username:joi.string().required(),
  emailAddress: joi.string().email({ minDomainAtoms: 2 }).required(),
  password: joi.string().min(6).required(),
  retypePassword:joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'password doesn\'t match ' } } }),
  isActive : joi.boolean().default(true, 'Example If Need Default Value'),
});

module.exports = {
  login,
  user
};
