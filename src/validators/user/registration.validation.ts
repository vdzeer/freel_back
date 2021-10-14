import * as Joi from 'joi'
import { RegExpEnum } from '../../constants'

export const userRegistrationValidator = Joi.object({
  login: Joi.string().trim().min(3).max(25),
  name: Joi.string().trim().min(2).max(25),
  email: Joi.string().trim().email(),
  password: Joi.string().trim().required(),
  status: Joi.string().trim().required(),
  role: Joi.string().trim().required(),
  phone: Joi.string().regex(RegExpEnum.phone).trim(),
})
