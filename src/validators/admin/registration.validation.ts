import * as Joi from 'joi'

export const adminRegistrationValidator = Joi.object({
  email: Joi.string().trim().email(),
  password: Joi.string().trim().required(),
})
