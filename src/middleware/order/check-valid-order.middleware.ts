import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { orderCreateValidator } from '../../validators'
import { ErrorHandler, errors } from '../../errors'

export const checkIsValidOrderMiddleware = (
  req,
  res: Response,
  next: NextFunction,
) => {
  const { error } = orderCreateValidator.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        error.details[0].message,
        errors.VALIDATION_ERROR.code,
      ),
    )
  }
  next()
}
