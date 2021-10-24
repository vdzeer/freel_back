import * as Joi from 'joi'

export const adminLoginValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
})
