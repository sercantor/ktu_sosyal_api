import * as Joi from 'joi';

module.exports = {
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
  }),
};
