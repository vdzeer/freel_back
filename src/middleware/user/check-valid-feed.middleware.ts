import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { userFeedbackValidator } from '../../validators'
import { ErrorHandler, errors } from '../../errors'

export const checkIsValidFeedbackMiddleware = (
  req,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userFeedbackValidator.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        error.details[0].message,
        errors.VALIDATION_ERROR.code,
      ),
    )
  }

  if (req.body.userId === req.user.id) {
    return next(
      new ErrorHandler(
        StatusCodes.BAD_REQUEST,
        errors.CANT_ADD_FEED_YOURSELF.message,
        errors.CANT_ADD_FEED_YOURSELF.code,
      ),
    )
  }

  next()
}
