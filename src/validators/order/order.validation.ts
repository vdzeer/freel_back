import * as Joi from 'joi'

export const orderCreateValidator = Joi.object({
  description: Joi.string().trim().required(),
  title: Joi.string().trim().required(),
  garant: Joi.boolean().required(),
  premium: Joi.boolean().required(),
  price: Joi.number().required(),
  country: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  spec: Joi.string().trim().required(),
})
