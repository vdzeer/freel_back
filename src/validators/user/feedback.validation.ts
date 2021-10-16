import * as Joi from 'joi'

export const userFeedbackValidator = Joi.object({
  userId: Joi.string().trim().required(),
  description: Joi.string().trim(),
  rate: Joi.number().required(),
})
